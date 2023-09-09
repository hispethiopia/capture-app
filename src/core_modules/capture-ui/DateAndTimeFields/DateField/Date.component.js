// @flow
import React, { createRef } from 'react';
import { CalendarInput } from '@dhis2/ui';
import { lowerCaseFirstLetter } from '../../internal/utils/string/lowerCaseFirstLetter';
import { systemSettingsStore } from '../../../capture-core/metaDataMemoryStores';

type Props = {
    value: ?string,
    width: number,
    maxWidth?: ?number,
    calendarWidth?: ?number,
    calendarHeight?: ?number,
    inputWidth?: ?number,
    disabled?: ?boolean,
    onBlur: (value: string) => void,
    onFocus?: ?() => void,
    onDateSelectedFromCalendar?: () => void,
};

type State = {
    popoverOpen: boolean,
};

type CalendarEvent = {
    calendarDateString: string,
}

export class DateField extends React.Component<Props, State> {
    static splitPassOnProps(passOnProps: ?Object) {
        const splittedProps = {
            input: {},
            popup: {},
            calendar: {},
        };

        if (!passOnProps) {
            return splittedProps;
        }

        return Object
            .keys(passOnProps)
            .reduce((accSplittedProps, propKey) => {
                let propContainer;
                if (propKey.startsWith(DateField.propContainers.CALENDAR)) {
                    propContainer = DateField.propContainers.CALENDAR;
                } else if (propKey.startsWith(DateField.propContainers.POPUP)) {
                    propContainer = DateField.propContainers.POPUP;
                } else {
                    propContainer = DateField.propContainers.INPUT;
                }

                const outputKey = lowerCaseFirstLetter(propKey.replace(propContainer, ''));
                accSplittedProps[propContainer][outputKey] = passOnProps[propKey];
                return accSplittedProps;
            }, splittedProps);
    }

    containerInstance: ?HTMLElement;
    handleTextFieldFocus: () => void;
    handleDateSelected: (event: CalendarEvent) => void;
    handleTextFieldBlur: (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    hidePopover: () => void;
    handleDocumentClick: (event: MouseEvent) => void;
    calendarWrapperDOMElementRef: { current: ?HTMLDivElement };

    constructor(props: Props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };

        this.handleTextFieldFocus = this.handleTextFieldFocus.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        this.calendarWrapperDOMElementRef = createRef();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    static propContainers = {
        CALENDAR: 'calendar',
        POPUP: 'popup',
        INPUT: 'input',
    };

    handleTextFieldFocus() {
        document.removeEventListener('click', this.handleDocumentClick);

        this.setState({
            popoverOpen: true,
        });

        this.props.onFocus && this.props.onFocus();
    }

    handleDateSelected({ calendarDateString: value }: CalendarEvent) {
        this.props.onBlur(value);
        this.hidePopover();
        this.props.onDateSelectedFromCalendar && this.props.onDateSelectedFromCalendar();
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick({ target }: MouseEvent) {
        const calendarWrapperDOMElement = this.calendarWrapperDOMElementRef.current;

        if (!calendarWrapperDOMElement) {
            throw Error('calendar wrapper DOM element not found');
        }

        if (target === calendarWrapperDOMElement ||
            (target instanceof Node && calendarWrapperDOMElement.contains(target))) {
            return;
        }

        this.hidePopover();
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleTextFieldBlur({ relatedTarget, currentTarget }: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const calendarWrapperDOMElement = this.calendarWrapperDOMElementRef.current;

        if (!calendarWrapperDOMElement) {
            throw Error('calendar wrapper DOM element not found');
        }

        if (relatedTarget === calendarWrapperDOMElement ||
            (relatedTarget instanceof Node && calendarWrapperDOMElement.contains(relatedTarget))) {
            document.addEventListener('click', this.handleDocumentClick);
        } else {
            this.props.onBlur(currentTarget.value);
            this.hidePopover();
        }
    }

    hidePopover() {
        this.setState({
            popoverOpen: false,
        });
    }

    render() {
        const {
            width,
            maxWidth,
            calendarWidth,
            calendarHeight,
            inputWidth,
            onBlur,
            onFocus,
            onDateSelectedFromCalendar,
            ...passOnProps
        } = this.props;
        const splittedPassOnProps = DateField.splitPassOnProps(passOnProps);

        return (
            <div
                ref={(containerInstance) => { this.containerInstance = containerInstance; }}
                style={{
                    width,
                    maxWidth,
                }}
            >
                <CalendarInput
                    onDateSelect={this.handleDateSelected}
                    calendar={systemSettingsStore.get().calendar}
                    date={splittedPassOnProps && splittedPassOnProps.input && splittedPassOnProps.input.value ? splittedPassOnProps.input.value : ''}
                    {...splittedPassOnProps.input}
                />

            </div>
        );
    }
}
