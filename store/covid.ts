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
        state.ListCovid.Countries = data.Countries
        state.ListCovid.Global = data.Global
    },
    sortCovid(state: State, data: Covid, title: string){
        switch (title){
            case "MostTotal":
                state.ListCovid.Countries = data.Countries.sort((a: Countries,b: Countries) => a.TotalConfirmed > b.TotalConfirmed ? 1 : -1  )
            case "HighestNumber":
                state.ListCovid.Countries = data.Countries.sort((a: Countries,b: Countries) => a.TotalDeaths > b.TotalDeaths ? 1 : -1  )
            case "LeastRecoverd":
                state.ListCovid.Countries = data.Countries.sort((a: Countries,b: Countries) => a.TotalRecovered > b.TotalRecovered ? 1 : -1  )
        }
    },
}

  export const actions: Actions<State, State> = {
    getDataCovid: async ({ commit }) => {
        const response = await axios.get(`https://api.covid19api.com/summary`)
        if(response.data) {commit('storeCovid', response.data)}
    },
    sortDataCovid: async ({ commit }, payload: {data: State, title: string }) => {
        commit('sortCovid', {data: payload.data, title: payload.title})
    },
  };