'use strict'

module.exports = function () {
  return {
    visitor: {
      Program (path, state) {
        const options = state.opts

        path.traverse({
          ImportDeclaration({ node }) {
            if (node.source.type === 'StringLiteral' && options.test.test(node.source.value)) {
              node.source.value = options.rename(node.source.value)
            }
          }
        })
      }
    },
  }
}
