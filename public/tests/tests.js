var assert = chai.assert;

suite('Analizador Lexico', function() {

  test('Se parsea correctamente.', function() {
    var parse = make_parse();

    var source = "var a = 3 + 3;";
    var string, tree;
    try {
        tree = parse(source);
        string = JSON.stringify(tree, ['key', 'name', 'message',
            'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

    assert.deepEqual(string, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": "+",\n        "arity": "binary",\n        "first": {\n            "value": 3,\n            "arity": "literal"\n        },\n        "second": {\n            "value": 3,\n            "arity": "literal"\n        }\n    }\n}');
  });

  test('Parseo de sentencia if.', function() {
    var parse = make_parse();

    var source = "var a = true; \n var aux = 0; \n if(a) { \n aux += 3; \n }";
    var string, tree;
    try {
        tree = parse(source);
        string = JSON.stringify(tree, ['key', 'name', 'message',
            'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

    assert.deepEqual(string, '[\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "a",\n            "arity": "name"\n        },\n        "second": {\n            "value": true,\n            "arity": "literal"\n        }\n    },\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "aux",\n            "arity": "name"\n        },\n        "second": {\n            "value": 0,\n            "arity": "literal"\n        }\n    },\n    {\n        "value": "if",\n        "arity": "statement",\n        "first": {\n            "value": "a",\n            "arity": "name"\n        },\n        "second": {\n            "value": "+=",\n            "arity": "binary",\n            "first": {\n                "value": "aux",\n                "arity": "name"\n            },\n            "second": {\n                "value": 3,\n                "arity": "literal"\n            }\n        },\n        "third": null\n    }\n]');
    });

  test('Se parsea el contenido inicial del cuadro de texto', function() {
    var parse = make_parse();

    var source = document.getElementById('INPUT').value;
    var string, tree;
    try {
        tree = parse(source);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

    assert.deepEqual(string, '[\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "a",\n            "arity": "name"\n        },\n        "second": {\n            "value": "hello",\n            "arity": "literal"\n        }\n    },\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "b",\n            "arity": "name"\n        },\n        "second": {\n            "value": "function",\n            "arity": "function",\n            "first": [\n                {\n                    "value": "x",\n                    "arity": "name"\n                }\n            ],\n            "second": [\n                {\n                    "value": "=",\n                    "arity": "binary",\n                    "first": {\n                        "value": "c",\n                        "arity": "name"\n                    },\n                    "second": {\n                        "value": 3,\n                        "arity": "literal"\n                    }\n                },\n                {\n                    "value": "return",\n                    "arity": "statement",\n                    "first": {\n                        "value": "+",\n                        "arity": "binary",\n                        "first": {\n                            "value": "x",\n                            "arity": "name"\n                        },\n                        "second": {\n                            "value": "c",\n                            "arity": "name"\n                        }\n                    }\n                }\n            ]\n        }\n    }\n]');
  });

  test('Se envia mensaje de error de sintaxis', function() {
    var parse = make_parse();

    var source = "pepe";
    var string, tree;
    try {
        tree = parse(source);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

    assert.deepEqual(string, '{\n    "name": "SyntaxError",\n    "message": "Undefined.",\n    "from": 0,\n    "to": 4,\n    "value": "pepe",\n    "arity": "name"\n}');
    });

});
