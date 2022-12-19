/*
 * Shorthand Properties
 * ==============================
 */

// Previously
function createProfileOld (firstName, lastName, id, avatar) {

    const name = firstName + ' ' lastName
    return {
      name,
      id: id,
      avatar: avatar,
    }
  }

// Using shorthand properties
function createProfileNew (name, id, avatar) {
    return {
        name,
        id,
        avatar,
    }
}

/*
 * Shorthand Method Names
 * ==============================
 */

// function createProfileMethodOld (name, id, avatar) {
//     return {
//         name,
//         id,
//         avatar,
//         save: function () {
//         // save message
//         }
//     }
// }


function createProfileMethodNew (name, id, avatar) {
    function save () {
        console.log('smth')
    }
    return {
        name,
        id,
        avatar,
        save: save()
    }
}

// const profile = createProfileMethodNew('Smilyan', 123123, 'url')
// profile.save()

// const profile = createProfileMethodOld('Smilyan', 2134, 'url')

// profile.save()