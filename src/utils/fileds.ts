import { SelectProps } from "ant-design-vue"
import { ColumnsType } from "ant-design-vue/es/table"
import { nextTick, ref, Ref } from "vue"

export interface IObjectListRow {
    key: string | number
    id: string
    name: string
    raw: any
}

interface TableFieldObjectControllerOptions {
    metaClass: string
    columns: ColumnsType<any>
    pageSize?: number
    enableSelection?: boolean
    fetchUrl?: string
}

export class DropdownFieldObjectController {
    public title: Ref<string>
    public options: Ref
    public selectOptions: Ref
    public metaClass: string
    public dropdownOpen: Ref
    private searchToken: number

    constructor(title: string, metaClass: string, allowEmptyValue: boolean = false) {
        this.title = ref(title)
        this.options = ref<SelectProps['options']>([])
        this.dropdownOpen = ref(false)
        this.searchToken = 0
        this.selectOptions = ref({
            loading: false,
            page: 1,
            hasMore: true,
            allowEmptyValue: allowEmptyValue,
            isSearchMode: false,
        })
        this.metaClass = metaClass

        this.loadData()
    }

    // Функция для загрузки данных в выпадающий список
    loadData = async () => {
        if (!this.selectOptions.value.hasMore) return

        this.selectOptions.value.loading = true

        try {
            const url = `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${this.metaClass}&page=${this.selectOptions.value.page}`

            const responseData = await jsApi.restCallAsJson(url, {}) as any
            const results = responseData.results ?? []

            const formattedResults = results.map((item: any) => ({
                value: item.id,
                label: item.text ?? item.id,
            }))

            if (this.selectOptions.value.allowEmptyValue && this.selectOptions.value.page === 1) {
                this.options.value = [{ value: 'empty', label: "[Не указано]" }, ...formattedResults]
            } else {
                this.options.value = [...(this.options.value ?? []), ...formattedResults]
            }

            this.selectOptions.value.page += 1
            this.selectOptions.value.hasMore = results.length > 0

        } catch (e) {
            console.error(e)
        } finally {
            this.selectOptions.value.loading = false
        }
    }

    // Обработчик прокрутки в выпадающий список
    handleScroll = (event: Event) => {
        const target = event.target as HTMLElement
        if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10) {
            this.loadData()
        }
    }

    // Сброс состояния поиска
    resetSearchState() {
        this.searchToken++
        this.selectOptions.value.isSearchMode = false
        this.selectOptions.value.page = 1
        this.selectOptions.value.hasMore = true
        this.options.value = []
    }

    // Обработчик поиска в выпадающий список
    handleSearch = async (value: string) => {
        const term = value?.trim()
        const currentToken = ++this.searchToken

        if (!term || term == '' || term === undefined) {
            this.resetSearchState()

            this.dropdownOpen.value = false
            await nextTick()
            this.dropdownOpen.value = true

            this.loadData()
            return
        }

        this.selectOptions.value.isSearchMode = true
        this.selectOptions.value.loading = true

        try {
            const url = value
                ? `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${this.metaClass}&term=${value}`
                : `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${this.metaClass}&page=${this.selectOptions.value.page}`

            const responseData = await jsApi.restCallAsJson(url, {})

            if (currentToken !== this.searchToken) return

            const results = responseData.results ?? []
            this.options.value = results.map((item: any) => ({
                value: item.id,
                label: item.text ?? item.id,
            }))

        } catch (e) {
            if (currentToken !== this.searchToken) return
        } finally {
            if (currentToken === this.searchToken) this.selectOptions.value.loading = false
        }
    }
}

export class DropdownFieldDictionaryController {
    public title: Ref<string>
    public options: Ref<SelectProps['options']>
    private sourceOptions: SelectProps['options']

    public selectOptions: Ref<{
        loading: boolean
        page: number
        hasMore: boolean
        allowEmptyValue: boolean
        isSearchMode: boolean
    }>

    public dropdownOpen: Ref<boolean>

    constructor(
        title: string,
        options: SelectProps['options'],
        allowEmptyValue: boolean = false
    ) {
        this.title = ref(title)
        this.sourceOptions = options

        this.options = ref<SelectProps['options']>([])
        this.dropdownOpen = ref(false)

        this.selectOptions = ref({
            loading: false,
            page: 1,
            hasMore: true,
            allowEmptyValue,
            isSearchMode: false,
        })

        this.resetOptions()
    }

    private resetOptions() {
        this.options.value = this.selectOptions.value.allowEmptyValue
            ? [{ value: 'empty', label: '[Не указано]' }, ...this.sourceOptions ?? []]
            : [...this.sourceOptions ?? []]
    }

    // Обработчик поиска в выпадающий список
    handleSearch = (value: string) => {
        const query = value?.trim().toLowerCase()

        // 👉 очистили строку поиска
        if (!query) {
            this.selectOptions.value.isSearchMode = false
            this.resetOptions()
            return
        }

        this.selectOptions.value.isSearchMode = true
        this.selectOptions.value.loading = true

        const filtered = this.sourceOptions?.filter(option => {
            const label = String(option.label ?? '').toLowerCase()
            return label.includes(query)
        })

        this.options.value = this.selectOptions.value.allowEmptyValue
            ? [{ value: 'empty', label: '[Не указано]' }, ...filtered ?? []]
            : filtered

        this.selectOptions.value.loading = false
    }
}

export class AlertController {
    visiable: Ref<boolean>
    closable: Ref<boolean>
    showIcon: Ref<boolean>
    type: Ref<'success' | 'info' | 'warning' | 'error'>
    message: Ref<string | null>

    constructor(
        closable: boolean = true,
        type: 'success' | 'info' | 'warning' | 'error' = 'info',
        showIcon: boolean = true,
        message: string | null = null
    ) {
        this.visiable = ref(false)
        this.closable = ref(closable)
        this.showIcon = ref(showIcon)
        this.type = ref(type)
        this.message = ref(message)
    }

    show() {
        this.visiable.value = true
        return this
    }
    hidden() {
        this.visiable.value = false
        this.clear()
        return this
    }
    setMessage(message: string) {
        this.message.value = message
        this.show()
        return this
    }
    clear() {
        this.message.value = null
        return this
    }
    setType(type: 'success' | 'info' | 'warning' | 'error') {
        this.type.value = type
        return this
    }
}

export class ModalController {
    title: Ref<string>
    visiable: Ref<boolean>

    constructor(
        title: string
    ) {
        this.title = ref(title)
        this.visiable = ref(false)
    }

    show() {
        this.visiable.value = true
        return this
    }
    hidden() {
        this.visiable.value = false
        return this
    }
}

export class AttrGroupController {
    public title: Ref<string>
    public show: Ref<boolean>
    public activeKey: Ref<number | null>
    public items: Ref<Array<[string, string]>>

    constructor(
        title: string,
        items: Array<[string, string]> = []
    ) {
        this.title = ref(title)
        this.items = ref(items)
        this.show = ref(false)
        this.activeKey = ref(null)
    }

    open() {
        this.show.value = true
        this.activeKey.value = 1
        return this
    }
    close() {
        this.show.value = false
        this.activeKey.value = null
        return this
    }
}

export class TabGroupController {
    defaultTab: Ref<number>
    activeTab: Ref<number>

    constructor(defaultTab: number = 1) {
        this.defaultTab = ref(defaultTab)
        this.activeTab = ref(defaultTab)
    }

    set(number: number) {
        this.activeTab.value = number
        return this
    }
    home() {
        this.activeTab.value = this.defaultTab.value
        return this
    }
}

export class TableFieldObjectController {
    public loading = ref(false)
    public page = ref(1)
    public hasMore = ref(true)
    public tableData = ref<IObjectListRow[]>([])
    public selectedRowKeys = ref<(string | number)[]>([])
    public rowSelection: any
    public metaClass: string
    public columns: ColumnsType<any>
    public pageSize: number
    public enableSelection: boolean
    public fetchUrl: string

    private requestToken = 0

    constructor(options: TableFieldObjectControllerOptions) {
        this.metaClass = options.metaClass
        this.columns = options.columns
        this.pageSize = options.pageSize ?? 20
        this.enableSelection = options.enableSelection ?? false
        this.fetchUrl = options.fetchUrl ?? '/exec?func=modules.restModule.getObjectsByPages'

        if (this.enableSelection) {
            this.rowSelection = {
                selectedRowKeys: this.selectedRowKeys.value,
                onChange: (keys: (string | number)[]) => {
                    this.selectedRowKeys.value.length = 0
                    this.selectedRowKeys.value.push(...keys)
                },
            }
        }
    }

    loadPage = async (page = 1) => {
        if (this.loading.value) return
        if (!this.hasMore.value && page !== 1) return

        const token = ++this.requestToken
        this.loading.value = true

        try {
            const url = `${this.fetchUrl}&params=request,response,user&metaClass=${this.metaClass}&page=${page}`

            const response = await jsApi.restCallAsJson(url, {})
            if (token !== this.requestToken) return

            const resultsRaw = response?.results
            const results = Array.isArray(resultsRaw) ? resultsRaw : []

            const mapped = results.map((item: any) => ({
                key: item.id,
                id: item.id,
                name: item.text ?? item.id,
                raw: item,
            }))

            if (page === 1) {
                this.tableData.value = mapped
            } else {
                this.tableData.value = [...this.tableData.value, ...mapped]
            }

            this.page.value = page + 1
            this.hasMore.value = results.length > 0
        } catch (e) {
            console.error(e)
        } finally {
            if (token === this.requestToken) this.loading.value = false
        }
    }

    search = async (term?: string) => {
        const value = term?.trim()
        const token = ++this.requestToken

        this.loading.value = true
        this.page.value = 1
        this.hasMore.value = true

        try {
            const url =
                `${this.fetchUrl}` +
                `&params=request,response,user` +
                `&metaClass=${this.metaClass}` +
                (value ? `&term=${encodeURIComponent(value)}` : '')

            const response = await jsApi.restCallAsJson(url, {})
            if (token !== this.requestToken) return

            const results = response?.results ?? []

            this.tableData.value = results.map((item: any) => ({
                key: item.id,
                id: item.id,
                name: item.text ?? item.id,
                raw: item,
            }))
        } catch (e) {
            console.error(e)
        } finally {
            if (token === this.requestToken) {
                this.loading.value = false
            }
        }
    }

    refresh = async () => {
        this.page.value = 1
        this.hasMore.value = true
        await this.loadPage(1)
    }

    getSelectedRows(): IObjectListRow[] {
        return this.tableData.value.filter(row =>
            this.selectedRowKeys.value.includes(row.key)
        )
    }

    clearSelection() {
        this.selectedRowKeys.value = []
    }
}