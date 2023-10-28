import {addNewPostAction, ProfilePostsArrType, ProfileReducer, ProfileStateTypes} from "../ProfileReducer";

export {}
test('length of posts should be incremented', () => {
    // 1. test data
    let action = addNewPostAction('it-kamasutra.com')
    let state: ProfileStateTypes = {
        newPostText: 'it-kamasutra.com',
        posts: [
            {"message": "It is my first post1", "id": "1", "likesCount": 15},
            {"message": "It is my second post2", "id": "2", "likesCount": 153},
        ]
    };
    // 2. action
    let newState = ProfileReducer(state,action)
    // 3. expectation
    expect(newState.posts.length).toBe(3)
})

