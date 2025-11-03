describe('API – JSONPlaceholder', () => {
    const API = 'https://jsonplaceholder.typicode.com'

    it('GET /posts/1 → 200 + shape', () => {
        cy.request(`${API}/posts/1`)
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.include.keys('userId', 'id', 'title', 'body')
                expect(res.body.id).to.eq(1)
            })
    })

    it('POST /posts → 201 + id + echo', () => {
        const payload = { title: 'QA test', body: 'hello', userId: 1 }

        cy.request('POST', `${API}/posts`, payload)
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.include(payload)
            })
    })

    it('GET /posts/999999 → 404 attendu ?', () => {
        cy.request({
            url: `${API}/posts/999999`,
            failOnStatusCode: false,
        }).then((res) => {
            expect([200, 404]).to.include(res.status)
        })
    })
})