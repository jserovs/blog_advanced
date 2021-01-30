describe('Blog app', function () {

  beforeEach(function () {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Cypress Ruller',
      username: 'cypr',
      password: 'us%%%3'
    }

    cy.clearLocalStorage()

    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  describe('Login', function () {

    it('Login form is shown', function () {
      cy.contains('Log in to application').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()

      cy.contains('Wrong credentials')
      cy.get('#messageBox').should('have.class', 'error')
      cy.get('#messageBox').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypr')
      cy.get('#password').type('us%%%3')
      cy.contains('Login').click()

    })
  })

  describe('When logged in', function () {

    const newBlogPost = {
      title: 'This is the Cypress created blog',
      author: 'Blog author',
      url: 'Blog url'
    }

    beforeEach(function () {
      cy.get('#username').type('cypr')
      cy.get('#password').type('us%%%3')
      cy.contains('Login').click()

      cy.contains('add blog').click()
      cy.get('#title').type(newBlogPost.title)
      cy.get('#author').type(newBlogPost.author)
      cy.get('#url').type(newBlogPost.url)
      cy.contains('save').click()

    })

    it('A blog can be created', function () {

      cy.contains('BLOG: ' + newBlogPost.title + ' by ' + newBlogPost.author + ' added sucesfully')
      cy.get('#messageBox').should('have.class', 'notification')
      cy.get('#messageBox').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#blogs').contains(newBlogPost.title)
    })


    it('A blog can be liked', function () {

      cy.contains('show details').click()
      cy.get('#blogs').contains('like').click()
      cy.contains('likes').contains('1')
    })

    it('Blog can not be deleted by other user, just does not see them', function () {
      cy.contains('BLOG: ' + newBlogPost.title + ' by ' + newBlogPost.author + ' added sucesfully')

      const tempUser = {
        name: 'Evil Ruller',
        username: 'evil',
        password: 'us%%%3'
      }

      cy.clearLocalStorage()
      cy.request('POST', 'http://localhost:3001/api/users/', tempUser)
      cy.visit('http://localhost:3000')

      cy.get('#username').type('evil')
      cy.get('#password').type('us%%%3')
      cy.contains('Login').click()

      cy.get('#blogs').children().should('not.exist')

    })

    it('Blog can be deleted by existing user', function () {
      cy.contains('show details').click()
      cy.get('#blogs').contains('remove').click()
      cy.get('#blogs').children().should('not.exist')
    })


    it('Blogs sorted based on likes', function () {

      cy.contains('add blog').click()
      cy.get('#title').type('more click to be')
      cy.get('#author').type('cypress click bot')
      cy.get('#url').type('https://localhost/click')
      cy.contains('save').click()

      // wait for rendering
      cy.wait(1000).then(() => {
        cy.get('#blogs').get('.blogEntry').eq(0).should('contain', 'This is the Cypress created blog')
        cy.get('#blogs').get('.blogEntry').eq(1).contains('show details').click()
        cy.get('#blogs').get('.blogEntry').eq(1).contains('like').click()


      })
      // wait for rendering
      // could use waitUntill
      cy.wait(1000).then(() => {
        cy.get('#blogs').get('.blogEntry').eq(0).should('contain', 'more click to be')
        cy.get('#blogs').get('.blogEntry').eq(0).should('contain', 'likes: 1')
      })

    })

  })
})