const locators = {
    LOGIN : {
        USER : '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },

    MOVIMENTACAO: {
        DESCRICAO: '#descricao',
        VALOR: '.col-4 > .form-control',
        INTERESSADO: '#envolvido',
        BTN_SALVAR: '.btn-primary'

    },

    MENU: {
        MOVIMENTACAO: ':nth-child(2) > .nav-link > .fas'
    },

    MESSAGE: '.toast-message'
}

export default locators;