import { ActionContext, ActionTree } from 'vuex'
import axios from 'axios'

export type Countries = {
  Country: String
  CountryCode: String
  Slug: String
  NewConfirmed: String
  TotalConfirmed: String
  NewDeaths: String
  TotalDeaths: String
  NewRecovered: String
  TotalRecovered: String
  Date: String
  removed: Boolean
}

export type ListName = {
  common: String
  official: String
}

export type Flags = {
  png: String
  svg: String
}
export type CountryType = {
  name: ListName
  capital: String[]
  region: String
  subregion: String
  flags: Flags
  population: Number
}

export type Covid = {
  Countries: Countries[]
}

export type CountryPeriod = {
  ID: String
  Country: String
  CountryCode: String
  Province: String
  City: String
  CityCode: String
  Lat: String
  Lon: String
  Confirmed: Number
  Deaths: Number
  Recovered: Number
  Active: String
  Date: Date
}

export type State = {
  ListCovid: Covid
  Country: CountryType
  CountryPeriod: CountryPeriod[]
}

export interface Actions<S, R> extends ActionTree<S, R> {
  getDataCovid: (context: ActionContext<S, R>) => void
}

export const state = (): State => ({
  ListCovid: {
    Countries: [],
  },
  Country: {
    name: {
      common: '',
      official: '',
    },
    capital: [],
    region: '',
    subregion: '',
    flags: {
      png: '',
      svg: '',
    },
    population: 0,
  },
  CountryPeriod: []
})

export const getters = {
  dataCovid(state: State) {
    return state.ListCovid.Countries.filter((data) => data.removed === false)
  },
  dataCountry(state: State) {
    return state.Country
  },
  dataCountryPeriod(state: State) {
    return state.CountryPeriod
  }
}

export const mutations = {
  storeCovid(state: State, data: Countries[]) {
    const listData: Countries[] = []
    data.map((country) => {
      return listData.push({
        ...country,
        removed: false,
      })
    })
    state.ListCovid.Countries = listData
  },
  sortCovid(state: State, payload: { title: string }) {
    switch (payload.title) {
      case 'MostTotal':
        state.ListCovid.Countries = state.ListCovid.Countries.sort(
          (a: Countries, b: Countries) =>
            a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
        )
        break
      case 'HighestNumber':
        state.ListCovid.Countries = state.ListCovid.Countries.sort(
          (a: Countries, b: Countries) =>
            a.TotalDeaths < b.TotalDeaths ? 1 : -1
        )
        break
      case 'LeastRecoverd':
        state.ListCovid.Countries = state.ListCovid.Countries.sort(
          (a: Countries, b: Countries) =>
            a.TotalRecovered > b.TotalRecovered ? 1 : -1
        )
        break
    }
  },
  removeCovid(state: State, payload: { countryCode: string }) {
    const index = state.ListCovid.Countries.findIndex(
      (data) => data.CountryCode === payload.countryCode
    )
    state.ListCovid.Countries[index].removed = true
  },
  storeCountry(state: State, data: CountryType) {
    state.Country = data
  },
  storeCountryPeriod(state: State, data: CountryPeriod[]) {
    state.CountryPeriod = data
  },

}

export const actions: Actions<State, State> = {
  getDataCovid: async ({ commit }) => {
    const response = await axios.get(`https://api.covid19api.com/summary`)
    if (response.data) {
      commit(
        'storeCovid',
        response.data.Countries.sort((a: Countries, b: Countries) =>
          a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
        )
      )
    }
  },
  getDataPeriod: async ({ commit }, payload: { Slug: string }) => {
    // get Data from 01/01/2021 => 14/3/2022 because data is large
    const response = await axios.get(`https://api.covid19api.com/country/${payload.Slug}?from=2022-01-01T00:00:00Z&to=2022-03-14T00:00:00Z`)
    if (response.data) {
      commit(
        'storeCountryPeriod',
        response.data
      )
    }
  },
  sortDataCovid: ({ commit }, payload: { title: string }) => {
    commit('sortCovid', { title: payload.title })
  },
  removeDataCovid: ({ commit }, payload: { countryCode: string }) => {
    commit('removeCovid', { countryCode: payload.countryCode })
  },
  getDataCountry: async ({ commit }, payload: { countryCode: String }) => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${payload.countryCode}`
    )
    if (response.data && response.data.length) {
      commit('storeCountry', response.data[0])
    }
  },
}
