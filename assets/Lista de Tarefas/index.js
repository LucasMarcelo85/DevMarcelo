const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "\n\t ====== Bem vindo ao App Tarefas! ======"

let metas

//Carregar Metas no Banco
const carregarMetas =async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){
        metas = []
    }
}

//Salvar Metas no Banco
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

    //Opçao Cadastrar Metas
const cadastrarMeta = async () => {
    const meta = await input({ message: "\n\t >>> Digite sua Tarefa:"})

    if(meta.length == 0) {
        mensagem = '\n\t === A tarefa não pode ser vazia. ==='
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

        mensagem = "\n\t === Tarefa cadastrada com sucesso! ==="

}

    //Opçao Listar Metas
const listarMetas = async () => {

    if (metas.length == 0){
        mensagem = "\n\t === Não existem Tarefas cadastradas! === "
        return
    }

    const respostas = await checkbox({
        message: "\n\t *** Use as setas p/ mover. Espaço para marcar ou desmarcar. Enter para finalizar ***",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "\n\t === Nenhuma Tarefa selecionada! ==="
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem ='\n\t === Tarefa(s) marcada(s) como concluída(s)! ==='

}

    //Opçao Metas Realizadas
const metasRealizadas = async () => {

    if (metas.length == 0){
        mensagem = "\n\t === Não existem Tarefas cadastradas! === "
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        mensagem = "\n\t === Não existem Tarefas(s) Realizada(s) ainda! ==="
        return
    }
    await select({
        message:"\n\t *** Total  de Tarefas Realizadas: " + realizadas.length,
        choices:[...realizadas]
    })
}
    //Opçao Metas Abertas
const metasAbertas = async () => {

    if (metas.length == 0){
        mensagem = "\n\t === Não existem Tarefas cadastradas! === "
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        mensagem = "\n\t === Não existem Tarefas em aberto! ==="
        return
    }
    await select({
        message:"\n\t *** Total de Tarefas Abertas: " + abertas.length,
        choices:[...abertas]
    })
}

   //Opçao Deletar Metas
   const deletarMetas = async () => {

    if (metas.length == 0){
        mensagem = "\n\t === Não existem Tarefas cadastradas! === "
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checkbox: false}
    })
    const itemsADeletar = await checkbox({
        message: "\n\t === Selecione um item para ser deletado. ===",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0){
        mensagem = "\n\t === Nenhum item para ser deletado! ==="
        return
    }

    itemsADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
        mensagem = "\n\t Tarefa(s) deletadas com sucesso !"
}

    // Mostrar mensagem
const mostrarMensagem = () => {
    console.clear();

    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

// Inicio Menu e funções
const start = async () => {
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()
        
        const opcao = await select({
            message: "\n\t === INICIO === >",
            choices: [
                {
                    name: "\t CADASTRAR TAREFA",
                    value: "cadastrar"
                },
                {
                    name: "\t LISTAR TAREFAS",
                    value: "listar"
                },
                {
                    name: "\t TAREFAS REALIZADAS",
                    value: "realizadas"
                },
                {
                    name: "\t TAREFAS ABERTAS",
                    value: "abertas"
                },
                {
                    name: "\t DELETAR TAREFAS",
                    value: "deletar"
                },
                {
                    name: "\t SAIR",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas ()             
                break
            case "abertas":
                await metasAbertas ()             
                break
            case "deletar":
                await deletarMetas ()             
                break
            case "sair":
                mensagem = '\n\t ==== ATÉ A PRÓXIMA! ===='
                return
        }
    }
}

start();