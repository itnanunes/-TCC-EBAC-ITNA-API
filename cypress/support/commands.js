// cypress/support/commands.js

Cypress.Commands.add('createCoupon', (couponData) => {
    const baseUrl = 'https://lojaebac.ebaconline.art.br/wp-json';
    const endpoint = '/wc/v3/coupons';
    
    return cy.request({
      method: 'POST',
      url: `${baseUrl}${endpoint}`,
      body: couponData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
      }
    }).then((response) => {
    expect(response.status).to.eq(201);
  
      const responseBody = response.body;
      expect(responseBody).to.have.property('code', couponData.code);
      expect(responseBody).to.have.property('amount', couponData.amount);
      expect(responseBody).to.have.property('discount_type', couponData.discount_type);
      expect(responseBody).to.have.property('description', couponData.description);
    });
  });
  