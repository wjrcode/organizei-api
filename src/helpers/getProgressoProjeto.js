module.exports = projeto => {
    let qtdBaixa = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'baixa') {
            return true;
        }

        return false;
    }).length;
    let qtdMedia = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'média') {
            return true;
        }

        return false;
    }).length;
    let qtdAlta = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'alta') {
            return true;
        }

        return false;
    }).length;

    let qtdBaixaConcluida = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'baixa' && atividade.concluido) {
            return true;
        }

        return false;
    }).length;
    let qtdMediaConcluida = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'média' && atividade.concluido) {
            return true;
        }

        return false;
    }).length;
    let qtdAltaConcludida = projeto.atividade.filter(atividade => {
        if (atividade.prioridade == 'alta' && atividade.concluido) {
            return true;
        }

        return false;
    }).length;

    // pesoBaixa = (qtdBaixa * 100) / projeto.atividade.length
    // pesoMedia = (qtdMedia * 100) / projeto.atividade.length
    // pesoAlta = (qtdAlta * 100) / projeto.atividade.length

    let porcentagem = 0

    if (qtdBaixa > 0 && qtdMedia > 0 && qtdAlta > 0) {
        pesoBaixa = 15
        pesoMedia = 35
        pesoAlta = 50
        porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoMedia / qtdMedia) * qtdMediaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
    }
    else if (qtdBaixa > 0 && qtdMedia > 0) {
        pesoBaixa = 40
        pesoMedia = 60
        porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoMedia / qtdMedia) * qtdMediaConcluida)
    }
    else if (qtdBaixa > 0 && qtdAlta > 0) {
        qtdBaixa = 30
        pesoAlta = 70
        porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
    }
    else if (qtdMedia > 0 && qtdAlta > 0) {
        qtdMedia = 40
        pesoMedia = 60
        porcentagem = ((pesoMedia / qtdMedia) * qtdMediaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
    }
    else if (qtdBaixa > 0) {
        pesoBaixa = 100
        porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida)
    }
    else if (qtdMedia > 0) {
        qtdMedia = 100
        porcentagem = ((pesoMedia / qtdMedia) * qtdMediaConcluida)
    }
    else if (qtdAlta > 0) {
        qtdAlta = 100
        porcentagem = ((pesoAlta / qtdAlta) * qtdAltaConcludida)
    }

    return `${porcentagem}%`
}
