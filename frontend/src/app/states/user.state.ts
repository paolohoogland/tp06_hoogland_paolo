import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { UserStateModel } from './user-state-model';
import { UpdatePseudo } from '../actions/user-action';

@State<UserStateModel>({
    name: 'user',
    defaults: {
        pseudo: 'not connected',
    },
})
@Injectable()
export class UserState {
    
    @Selector()
    static getPseudo(state: UserStateModel) {
        return state.pseudo;
    }

    @Action(UpdatePseudo)
    updatePseudo({ patchState }: StateContext<UserStateModel>, { payload }: any) {
        patchState({ pseudo: payload });
    }
}