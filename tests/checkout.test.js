const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");

test("checkout possui três etapas reais", () => {
  for (const etapa of [1, 2, 3]) {
    assert.match(html, new RegExp(`data-checkout-step="${etapa}"`));
    assert.match(html, new RegExp(`data-checkout-step-target="${etapa}"`));
  }
  assert.match(app, /function mostrarEtapaCheckout/);
  assert.match(app, /function renderRevisaoPedido/);
});

test("sacola permite editar item e mantém proteção do envio", () => {
  assert.match(app, /itemUidEmEdicao/);
  assert.match(app, /abrirModalProduto\(produtoMenu, item\)/);
  assert.match(app, /if \(enviandoPedido\) return/);
  assert.match(html, /id="checkbox-confirmar-envio"/);
});
