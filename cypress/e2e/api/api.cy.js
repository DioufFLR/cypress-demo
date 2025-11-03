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

    it('PATCH /posts/1 -> update title', () => {
        const payload = { title: 'QA test 2' }

        cy.request('PATCH', `${API}/posts/1`, payload)
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('id', 1)
                expect(res.body).to.include(payload)
            })
    })

    it('DELETE /posts/1 -> suppression', () => {
        cy.request('DELETE', `${API}/posts/1`)
            .then((res) => {
                expect([200, 204]).to.include(res.status)
                expect(res.body).to.be.empty
            })
    })
})