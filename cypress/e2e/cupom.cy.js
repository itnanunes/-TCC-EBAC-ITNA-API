/// <reference types="cypress" />
import contrato from '../contract/cupom.contract'

describe('API de Cupons', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/wc/v3/coupons`,
      auth: {
        username: 'admin_ebac',
        password: '@gjj0' // '@admin!&b@c!2022'
      }
    });
  });

  it('Deve listar cupons com sucesso', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/wc/v3/coupons`,
      headers: {
        Authorization: Cypress.env('auth_token')
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').that.is.not.empty;

      // Validar o contrato para cada cupom
      response.body.forEach(coupon => {
        const { error } = contrato.validate(coupon);
        expect(error).to.be.null;
      });
    });
  });

  it('Deve cadastrar cupons com sucesso', () => {
    const couponData = {
      code: 'cupom003',
      amount: '10',
      discount_type: 'fixed_product',
      description: 'Cupom de teste'
    };

    cy.createCoupon(couponData).then(response => {
      expect(response.status).to.eq(201);

      // Validar o contrato
      const { error } = contrato.validate(response.body);
      expect(error).to.be.null;
      expect(response.body.code).to.eq(couponData.code);
    });
  });

  it('Deve impedir listagem sem autenticação', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/wc/v3/coupons`,
      failOnStatusCode: false // Permite que o teste continue mesmo se a resposta não for 401
    }).then(response => {
      expect(response.status).to.eq(401); // Esperado 401 quando não autenticado
    });
  });

  // Teste que deve falhar sem autorização
  it('Deve impedir cadastro sem autorização', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/wc/v3/coupons`,
      body: {
        code: 'Ganhe10',
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Cupom de teste'
      },
      failOnStatusCode: false // Permite que o teste continue mesmo se a resposta não for 401
    }).then(response => {
      expect(response.status).to.eq(401); // Esperado 401 quando não autorizado
    });

    it('Teste de Performance - Listar cupons', () => {
      const start = new Date().getTime();

      cy.request({
        method: 'GET',
        url: `${baseUrl}/wc/v3/coupons`,
        headers: {
          Authorization: Cypress.env('auth_token')
        }
      }).then(() => {
        const end = new Date().getTime();
        const duration = end - start;
        expect(duration).to.be.lessThan(1000); // 1 segundo
      });
    });
  })
;});