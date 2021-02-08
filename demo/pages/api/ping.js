// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Auth from '@ampersand-xyz/loginpage'
import atob from 'atob'

export default async (req, res) => {
    var account 
    const pubKey = 'hHs1HScox0rWfzDjnD58KIepu916h1Fo'
    const secKey = 'bQvxHkfyv9P3HTHnWopIZ4zixP2mrBv3'
    try {
        account = await Auth.authorize(pubKey, secKey)
    } catch (e) {
        console.log(e)
    }
    return res.status(200).send(account)
}
