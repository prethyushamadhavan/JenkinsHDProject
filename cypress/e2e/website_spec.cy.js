
describe('Website Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Website.html') 
  })

  it('should display the correct title', () => {
    cy.title().should('include', 'Home')
  })

  it('should display the logo with correct src', () => {
    cy.get('.logo img').should('have.attr', 'src', 'logo.png')
  })

  it('should have navigation links', () => {
    cy.get('nav').within(() => {
      cy.contains('a', 'Home')
      cy.contains('a', 'About us')
      cy.contains('button', 'Admission')
      cy.contains('a', 'Facilities')
      cy.contains('button', 'Gallery')
      cy.contains('a', 'Events')
      cy.contains('a', 'Contact us')
    })
  })

  it('should have working carousel', () => {
    cy.get('.carousel-inner .carousel-item').should('have.length', 3)
    cy.get('.carousel-control-next').click()
    cy.get('.carousel-inner .carousel-item.active img').should('have.attr', 'src', 'uni4.jpg')
  })

  it('should display campus news and events', () => {
    cy.contains('h2', 'Campus News')
    cy.contains('h2', 'Events')
  })

  it('should display testimonials', () => {
    cy.contains('h2', "What Student Say's About Courses")
    cy.get('.testimonial').should('have.length', 3)
  })

  it('should display gallery images', () => {
    cy.contains('h2', 'Gallery')
    cy.get('.gallery-img').should('have.length', 6)
  })

  it('should display placement logos', () => {
    cy.contains('h2', 'Placement')
    cy.get('.placement img').should('have.length', 8)
  })

  it('should display footer with contact info', () => {
    cy.get('.footer').within(() => {
      cy.contains('h2', 'Best Institute For Education')
      cy.contains('h2', 'Quick Links')
      cy.contains('h2', 'Contact Info')
    })
  })
})
