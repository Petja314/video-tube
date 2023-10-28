import {createSelector} from "reselect";

const getUsersPage = (state : any) => state.usersPage;

export const getUsersPageSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage
);

export const getPageSizeSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.pageSize
);

export const getTotalUsersCountSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.totalUsersCount
);

export const getCurrentPageSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.currentPage
);

export const getIsFetchingSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.isFetching
);

export const getFollowingInProgressSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.followingInProgress
);

// export const getUsersPageSelector = (state : any) => {
//     return state.usersPage
// }
//
// export const getPageSizeSelector = (state : any) => {
//     return state.usersPage.pageSize
// }
// export const getTotalUsersCountSelector = (state : any) => {
//     return state.usersPage.totalUsersCount
// }
// export const getCurrentPageSelector = (state : any) => {
//     return state.usersPage.currentPage
// }
// export const getIsFetchingSelector = (state : any) => {
//     return state.usersPage.isFetching
// }
// export const getFollowingInProgressSelector = (state : any) => {
//     return state.usersPage.followingInProgress
// }

