import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import createHistory from 'history/createBrowserHistory'
import LoadingScreenWrapped from '../components/layout/LoadingScreenWrapped'

const locationHelper = locationHelperBuilder({})
const history = createHistory()

export const UserIsAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    AuthenticatingComponent: LoadingScreenWrapped,
    allowRedirectBack: true,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || '/signin',
    authenticatingSelector: ({firebase: {auth, profile, isInitializing}}) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({firebase: {auth}}) =>
        auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => (dispatch) => {
        history.replace(newLoc) // or routerActions.replace
        dispatch({type: 'UNAUTHED_REDIRECT'})
    },
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    AuthenticatingComponent: LoadingScreenWrapped,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || '/',
    authenticatingSelector: ({firebase: {auth, isInitializing}}) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({firebase: {auth}}) =>
        auth.isLoaded && auth.isEmpty,
    redirectAction: newLoc => (dispatch) => {
        history.replace(newLoc) // or routerActions.replace
        dispatch({type: 'UNAUTHED_REDIRECT'})
    },
})

