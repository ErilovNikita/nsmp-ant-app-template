export interface IFormState {
    someTextWithLoader: string | null
    someTextWithDescription: string
    number: number
    dropdownList: string | null,
    simpleCheckbox: boolean
    onceSelect: '1' | '2' | '3'
    slider: number
    rangePicker: [string, string]
}