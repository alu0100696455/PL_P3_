var assert = chai.assert;

suite('csv', function() {

  setup(function(){
    if (typeof __html__ !== 'undefined') {
      document.body.innerHTML = __html__['tests/index.html'];
      original = document.getElementById('original');
      finaltable = document.getElementById('finaltable');
    }
  });

  test('Dos filas con tres columnas', function() {
    original.value = 'a, 1, 2 \nb, 3, 4';
    setTimeout(function() {
      assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>a</td>                                  <td> 1</td>                                  <td> 2 </td>              </tr>\n<tr>                    <td>b</td>                                  <td> 3</td>                                  <td> 4</td>              </tr>\n</tbody></table>');
    }, 5000);
  });

  test('Dos filas con distinto número de columnas', function() {
    original.value = 'a, 1, 2 \nb, 3, 4, 5';
    setTimeout(function() {
      assert.match(finaltable.innerHTML, /error/);
    }, 5000);
  });

  test('Fila vacía', function() {
    original.value = 'a, 1, 2 \nb, 3, 4\n';
    setTimeout(function() {
      assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>a</td>                                  <td> 1</td>                                  <td> 2 </td>              </tr>\n<tr>                    <td>b</td>                                  <td> 3</td>                                  <td> 4</td>              </tr>\n</tbody></table>');
    }, 5000);
  });
});
