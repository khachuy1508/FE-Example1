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

export type Covid  = {
    Global: Global;
    Countries: Countries[];
}

export type State  = {
    ListCovid: Covid
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
  })
  
  export const getters = {
    dataCovid(state: State) {
        return state.ListCovid.Countries
    },
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
}

  export const actions: Actions<State, State> = {
    getDataCovid: async ({ commit }) => {
        const response = await axios.get(`https://api.covid19api.com/summary`)
        if(response.data) {commit('storeCovid', response.data)}
    },
    sortDataCovid: async ({ commit }, payload: {title: string }) => {
        commit('sortCovid', { title: payload.title})
    },
  };