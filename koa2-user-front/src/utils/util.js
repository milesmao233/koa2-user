// export const promisic = function(func) {
//     return function(params = {}) {
//         console.log('params', params)
//         return new Promise((resolve, reject) => {
//             const args = Object.assign(params, {
//                 success: res => {
//                     resolve(res)
//                 },
//                 fail: error => {
//                     reject(error)
//                 }
//             })
//             func(args)
//         })
//     }
// }

const log = console.log.bind(console)

export { log }
