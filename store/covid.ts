export type Global = {
    NewConfirmed?: String;
    TotalConfirmed?: String;
    NewDeaths?: String;
    TotalDeaths?: String;
    NewRecovered?: String;
    TotalRecovered?: String;
}

export type Countries = {
    Country: String;
    CountryCode: String;
    Slug: String;
    NewConfirmed: String;
    TotalConfirmed: String;
    NewDeaths: String;
    TotalDeaths: String;
    NewRecovered: String;
    TotalRecovered: String;
    Date: String;
}

export type ListName = {
    common: String;
    official: String;
}

export type Flags = {
    png: String;
    svg: String;
}
export type CountryType = {
    name: ListName;
    capital: String[];
    region: String;
    subregion: String;
    flags: Flags;
    population: Number;
}

export type Covid  = {
    Global: Global;
    Countries: Countries[];
}

export type State  = {
    ListCovid: Covid
    Country: CountryType
}

import { ActionContext, ActionTree } from 'vuex';
import axios from 'axios';

export interface Actions<S, R> extends ActionTree<S, R> {
    getDataCovid: (context: ActionContext<S, R>) => void;
  }

export const state = ():State => ({
    ListCovid: {
        Global:{},
        Countries: []
    },
    Country: {
        name: {
            common: '',
            official: ''
        },
        capital: [],
        region: '',
        subregion: '',
        flags: {
            png:'',
            svg:'',
        },
        population: 0
    }
  })
  
  export const getters = {
    dataCovid(state: State) {
        return state.ListCovid.Countries
    },
    dataCountry(state: State){
        return state.Country
    }
  }
  
  export const mutations = {
    storeCovid(state: State, data: Covid) {
        state.ListCovid.Countries = data.Countries.sort((a: Countries,b: Countries) => a.TotalConfirmed > b.TotalConfirmed ? -1 : 1  )
        state.ListCovid.Global = data.Global
    },
    sortCovid(state: State, payload: {title: string}){

        switch (payload.title){
            case "MostTotal":
                state.ListCovid.Countries = state.ListCovid.Countries.sort((a: Countries,b: Countries) => a.TotalConfirmed > b.TotalConfirmed ? -1 : 1  )
                break;
            case "HighestNumber":
                state.ListCovid.Countries = state.ListCovid.Countries.sort((a: Countries,b: Countries) => a.TotalDeaths > b.TotalDeaths ? -1 : 1  )
                break;
            case "LeastRecoverd":
                state.ListCovid.Countries = state.ListCovid.Countries.sort((a: Countries,b: Countries) => a.TotalRecovered > b.TotalRecovered ? 1 : -1  )
                break;
        }
    },
    storeCountry(state: State, data: CountryType) {
        state.Country=data
        console.log(1111,data)

    },
}

  export const actions: Actions<State, State> = {
    getDataCovid: async ({ commit }) => {
        const response = await axios.get(`https://api.covid19api.com/summary`)
        if(response.data) {commit('storeCovid', response.data)}
    },
    sortDataCovid: async ({ commit }, payload: {title: string }) => {
        commit('sortCovid', { title: payload.title})
    },
    getDataCountry: async ({ commit }, payload: {countryCode: String}) => {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${payload.countryCode}`)
        if(response.data && response.data.length) {commit('storeCountry', response.data[0])}
    },
  };