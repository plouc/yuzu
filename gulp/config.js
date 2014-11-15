module.exports = {
    groups: {
        admin: {
            src:        './web/src',
            dest:       './web/admin',
            cssDocDest: './web/admin/doc/css',
            js:  'admin/AdminApp.jsx',
            css: [ 'admin.scss' ],
            copy: {
                fonts: [
                    'vendor/font-awesome/fonts/*',
                    'fonts/roboto/*'
                ]
            }
        },
        frontend: {
            src:        './web/src',
            dest:       './web/frontend',
            cssDocDest: './web/frontend/doc/css',
            js:  'frontend/FrontendApp.jsx',
            css: [ 'frontend.scss' ],
            copy: {
                fonts: []
            }
        }
    }
};