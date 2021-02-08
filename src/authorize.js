import { appId, protocol, host } from './configure'

async function authorize(publicKey, secretKey, scope) {
    try {
        const res = await fetch(`${protocol}api.${host}/keys/${publicKey}/authorize`, {
            method: 'POST',
            body: JSON.stringify({ 
                'app_id': appId, 
                'secret_key': secretKey
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resBody = await res.json()
        if (res.status !== 200) throw new Error(resBody.msg)
        return resBody

    } catch (e) {
        console.log(e)
        throw e
    }
}

export default authorize