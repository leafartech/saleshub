import { useContext, useEffect, useState } from 'react'
import styles from './ClientForm.module.css'
import { sessionContext } from '../../../context/Session'
import Botao from '../Botao'
import axios from 'axios'
import Input from '../Input'
import Text from '../Text'
import { useRouter } from 'next/router'

export default function ClientForm({email, specific}) {
    const session = useContext(sessionContext)
    const router = useRouter()
    var params = router.query.id

    function formSubmited(e) {
        e.preventDefault()
    }

    useEffect(() => {
        setName(specific.name)
    }, [specific])

    const [ name, setName ] = useState('')

    const [ exclude, setExclude ] = useState(false)
    const [ error, setError ] = useState(false)

    async function buttonClicked(e) {
        //EXCLUIR DADOS
        if (e.target.id === 'exclude') {
            setExclude(!exclude)
        }

        //CONFIRMAR EXCLUSÃO
        if (e.target.id === 'excludeConfirmed') {
            await axios.post('/api/crud/DELETE', ['clients', parseInt(params.replace(':', '')) -1, email]).then(res => {
                //ATUALIZAR USUÁRIO NO LOCAL STORAGE
                //RESPONSE RETORNA O USUÁRIO ATUALZIADO
                session.setUser(res.data)
                router.back()
            }).catch(e => console.log(e))
        }
    }

    return (
        <form onSubmit={e => formSubmited(e)} className={ styles.form }>
            <Text title="Editar dados"  />
            <div className={ styles.productInpt }>
                <label>Nome</label>
                <Input readonly={true} produto={true} size={true} errorVerify={error["name"] === true ? true : ''} inptChange={e => inptChange(e)} label="Nome" name="name" type="text" value={name}/>
            </div>


            <div className="flex-2">
                <Botao
                    sm={true}
                    level="2"
                    text="Exluir"
                    type="button"
                    buttonClicked={e => buttonClicked(e)}
                    />
                <Botao 
                    sm={true}
                    level="1"
                    text="salvar"
                    type="submit"
                    buttonClicked={e => buttonClicked(e)}
                />
            </div>
            {exclude ?
                <Botao
                    sm={true}
                    level="2"
                    text="Confirmar exclusão"
                    type="button"
                    top={true}
                    excludeConfirm={true}
                    buttonClicked={e => buttonClicked(e)}
                />
            : ''}
        </form>
    )
}