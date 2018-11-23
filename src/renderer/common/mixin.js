const X2JS = require('x2js');
export default {
  methods: {
    fnXml2json(xmlText) {
      const x2js = new X2JS();
      return x2js.xml2js(xmlText);
    },
  },
};
