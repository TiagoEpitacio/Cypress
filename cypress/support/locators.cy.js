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
        STATUS: '[data-test="status"]',
        BTN_SALVAR: '.btn-primary',
        CONTA: ':nth-child(3) > :nth-child(2) > .form-control'

    },

    SALDO: {
        FN_XP_SALDO: nome => `//td[contains(.,"${nome}")]//../td[2]`
    },

    MENU: {
        MOVIMENTACAO: ':nth-child(2) > .nav-link > .fas',
        CONFIGURACOES: '.dropdown-toggle',
        RESETAR: '[href="/reset"]',
        HOME: ':nth-child(1) > .nav-link',
        EXTRATO: ':nth-child(3) > .nav-link > .fas'
    },

    MESSAGE: '.toast-message'
}

export default locators;