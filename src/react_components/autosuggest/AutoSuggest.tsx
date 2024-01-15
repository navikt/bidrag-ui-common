import { TextField } from "@navikt/ds-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { useEffect } from "react";
import { ReactElement } from "react";

import { removeNonPrintableCharachters } from "../../utils/StringUtils";

export function capitalizeFirstLetter(s: string) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function convertStringToNumber(value: string | number): number {
    if (typeof value === "string") {
        const result = parseInt(value, 10);
        return isNaN(result) ? 0 : result;
    }
    return value;
}
interface AutoSuggestProps {
    onChange: (value: string) => void;
    options: string[];
    label: string | ReactElement;
    defaultValue?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    sortOptions?: boolean;
}

export default function AutoSuggest(props: AutoSuggestProps) {
    const [activeOption, setActiveOption] = useState<number>(0);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string | undefined>(props.defaultValue);
    const onBlurTimeoutRef = useRef<NodeJS.Timeout>();
    const avoidBlurRef = useRef<boolean>(false);
    const [cursor, setCursor] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;
        if (input) input.setSelectionRange(cursor, cursor);
    }, [inputRef, cursor, userInput]);

    function searchSuggestions(options: string[], searchTerm: string) {
        const searchTermTrimmed = searchTerm.trim();
        const filteredOptions = options.filter(
            (currentOptionString) =>
                toUppercaseForEveryFirstLetter(currentOptionString).search(
                    getRegExForSearchedFirstLetterTerms(searchTermTrimmed)
                ) > -1
        );
        if (props.sortOptions != false) {
            return filteredOptions.sort(sortByLengthOfString);
        }
        return filteredOptions;
    }

    function getRegExForSearchedFirstLetterTerms(stringToRemoveWhiteSpacesFrom: string) {
        const charsToSearchFor = stringToRemoveWhiteSpacesFrom
            .replaceAll("+", "")
            .replaceAll(")", "")
            .replaceAll("(", "")
            .replaceAll("*", "")
            .replaceAll("[", "")
            .replaceAll("]", "")
            .split(" ");
        return charsToSearchFor.map((curr) => `(?=.*${capitalizeFirstLetter(curr)})`).join("");
    }

    function sortByLengthOfString(a: string, b: string) {
        return a.length - b.length;
    }

    function toUppercaseForEveryFirstLetter(stringToChange: string) {
        return stringToChange.split(" ").map(capitalizeFirstLetter).join("");
    }

    function hideOptions() {
        setActiveOption(0);
        setFilteredOptions([]);
        setShowOptions(false);
    }

    function onBlur() {
        onBlurTimeoutRef.current = setTimeout(() => {
            if (!avoidBlurRef.current) {
                hideOptions();
            }
        }, 10);
    }

    function avoidBlur() {
        avoidBlurRef.current = true;
        clearTimeout(onBlurTimeoutRef.current);
    }

    function onFocus(e: ChangeEvent<HTMLInputElement>) {
        const userInput = removeNonPrintableCharachters(e.target.value);
        showFilteredOptions(userInput);
        avoidBlurRef.current = false;
    }

    function showFilteredOptions(input: string) {
        const { options } = props;
        const filteredOptions = searchSuggestions(options, input);
        setShowOptions(true);
        if (filteredOptions.length > 0) {
            setActiveOption(0);
            setFilteredOptions(filteredOptions);
            setShowOptions(true);
        } else {
            setFilteredOptions([]);
            setShowOptions(false);
        }
        return filteredOptions;
    }

    function updateInput(value: string) {
        props.onChange(value);
        setUserInput(value);
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setCursor(e.target.selectionStart);
        const inputValue = removeNonPrintableCharachters(e.target.value);
        if (inputValue !== userInput) {
            showFilteredOptions(inputValue);
            updateInput(inputValue);
        }
    }

    function onOptionClick(e: React.MouseEvent<HTMLLIElement>) {
        avoidBlur();
        const eventTarget = e.target as HTMLElement;
        const value = eventTarget.innerText;
        updateInput(value);
        hideOptions();
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Escape") {
            setActiveOption(0);
            setShowOptions(false);
        } else if (e.code === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            if (showOptions) {
                const userInput = filteredOptions[activeOption];
                updateInput(userInput);
                hideOptions();
            }
        } else if (e.code === "ArrowUp") {
            if (activeOption === 0) {
                return;
            }
            setActiveOption((prevActiveOption) => prevActiveOption - 1);
        } else if (e.code === "ArrowDown") {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            setActiveOption((prevActiveOption) => prevActiveOption + 1);
        }
    }

    const className = `${props.label ? "has-label" : ""} ${props.description ? "has-description" : ""} ${
        props.options.length == 0 ? "empty-list" : ""
    }`;
    return (
        <div className={"autosuggest relative"} onBlur={onBlur}>
            <div className={`autosuggest-input ${className}`}>
                <TextField
                    size="small"
                    label={props.label}
                    type="text"
                    ref={(ref) => {
                        //@ts-ignore
                        inputRef.current = ref;
                    }}
                    description={props.description}
                    placeholder={props.placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    style={{ marginBottom: props.error ? "0px" : "30px" }}
                    className="w-full autosuggest_input"
                    autoComplete="off"
                    error={props.error}
                    id={"autogsuggest_" + props.label}
                    value={userInput}
                />
            </div>
            <SelectableOptions
                avoidBlur={avoidBlur}
                show={showOptions}
                options={filteredOptions}
                onHover={setActiveOption}
                activeOption={activeOption}
                onSelect={onOptionClick}
            />
        </div>
    );
}

interface SelectableOptionsProps {
    options: string[];
    show: boolean;
    activeOption: number;
    avoidBlur: () => void;
    onHover: (optionIndex: number) => void;
    onSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function SelectableOptions({ show, options, activeOption, onSelect, avoidBlur, onHover }: SelectableOptionsProps) {
    if (!show) {
        return null;
    }
    return (
        <ul className="options w-full" style={{ marginTop: "-14px" }}>
            {options.length === 0 ? (
                <li className="option-no-content">Ingen resultat</li>
            ) : (
                options.map((optionName, index) => (
                    <li
                        className={index === activeOption ? "option-active" : ""}
                        key={optionName}
                        onClick={onSelect}
                        onMouseDown={avoidBlur}
                        onFocus={avoidBlur}
                        onMouseOver={() => onHover(index)}
                    >
                        {optionName}
                    </li>
                ))
            )}
        </ul>
    );
}
