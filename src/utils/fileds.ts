import { SelectProps } from "ant-design-vue"
import { nextTick, ref, Ref } from "vue"

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

export class TableFieldObjectController<T extends { key: string | number }> {
  public columns: Ref<any[]>
  public dataSource: Ref
  public tableState: Ref
  public metaClass: string

  private searchToken = 0

  constructor(columns: any[], metaClass: string, pageSize: number = 100) {
    this.columns = ref(columns)
    this.dataSource = ref<T[]>([])
    this.metaClass = metaClass

    this.tableState = ref({
      loading: false,
      isSearchMode: false,
      selectedRowKeys: [],
      selectedRows: [],
      pagination: {
        page: 1,
        pageSize,
        total: 0,
      },
    })
  }

  // Загрузка данных
  loadData = async () => {
    if (this.tableState.value.loading) return

    this.tableState.value.loading = true

    try {
      const { page } = this.tableState.value.pagination

      const url =
        `/exec?func=modules.restModule.getObjectsByPages` +
        `&params=request,response,user` +
        `&metaClass=${this.metaClass}` +
        `&page=${page}`

      const response = await jsApi.restCallAsJson(url, {}) as any

      const results = response.results ?? []

      this.dataSource.value = results.map((item: any, index: number) => ({
        key: item.id ?? `${page}-${index}`,
        ...item,
      }))

      this.tableState.value.pagination.total = response.pagination?.total ?? this.dataSource.value.length

      console.log(this.tableState.value.pagination.total)
    } catch (e) {
      console.error(e)
    } finally {
      this.tableState.value.loading = false
    }
  }

  // Сброс поиска
  resetSearch() {
    this.searchToken++
    this.tableState.value.isSearchMode = false
    this.tableState.value.pagination.page = 1
    this.dataSource.value = []
  }

  // Row selection (AntD-ready)
  get rowSelection() {
    return {
      selectedRowKeys: this.tableState.value.selectedRowKeys,
      onChange: (keys: (string | number)[], rows: T[]) => {
        this.tableState.value.selectedRowKeys = keys
        this.tableState.value.selectedRows = rows
      },
    }
  }
}