// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var bottone = document.getElementById('apri-menu');
  var lista = document.getElementById('voci-menu');
  if (bottone && lista) {
    bottone.addEventListener('click', function () {
      var aperto = lista.classList.toggle('aperto');
      bottone.setAttribute('aria-expanded', aperto ? 'true' : 'false');
    });
  }

  // Date del tiro obbligatorio 2026 (aggiornare qui ogni anno)
  var dateTO = [
    { data: '2026-05-21', testo: 'giovedì 21 maggio 2026', orario: 'serale, 17.00 - 19.00' },
    { data: '2026-06-11', testo: 'giovedì 11 giugno 2026', orario: 'serale, 17.00 - 19.00' },
    { data: '2026-07-02', testo: 'giovedì 2 luglio 2026', orario: 'serale, 17.00 - 19.00' },
    { data: '2026-07-23', testo: 'giovedì 23 luglio 2026', orario: 'serale, 17.00 - 19.00' },
    { data: '2026-08-20', testo: 'giovedì 20 agosto 2026', orario: 'serale, 17.00 - 19.00' },
    { data: '2026-08-29', testo: 'sabato 29 agosto 2026', orario: 'pomeriggio, 13.30 - 18.00' }
  ];

  // Riquadro "prossimo tiro" sulla home
  var box = document.getElementById('prossimo-to');
  if (box) {
    var oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    var prossima = null;
    for (var i = 0; i < dateTO.length; i++) {
      if (new Date(dateTO[i].data + 'T00:00:00') >= oggi) { prossima = dateTO[i]; break; }
    }
    if (prossima) {
      box.querySelector('.data-grande').textContent = prossima.testo;
      box.querySelector('.orario-to').textContent = prossima.orario;
    } else {
      box.querySelector('.data-grande').textContent = 'Stagione ' + (oggi.getFullYear() + 1);
      box.querySelector('.orario-to').textContent = 'Le sessioni TO/TC per quest\u2019anno sono terminate. Le nuove date saranno pubblicate appena disponibili.';
    }
  }

  // Evidenzia la prossima data nella tabella TO/TC e sbarra quelle passate
  var righe = document.querySelectorAll('table.orari tr[data-data]');
  if (righe.length) {
    var oggi2 = new Date();
    oggi2.setHours(0, 0, 0, 0);
    var segnata = false;
    righe.forEach(function (r) {
      var d = new Date(r.getAttribute('data-data') + 'T00:00:00');
      if (d < oggi2) {
        r.classList.add('passata');
      } else if (!segnata) {
        r.classList.add('prossima');
        segnata = true;
      }
    });
  }
});

// Moduli: apre il programma di posta con i dati gia' compilati
function invioModulo(form, destinatario, oggetto) {
  var righe = [];
  var campi = form.querySelectorAll('input, select, textarea');
  campi.forEach(function (c) {
    if (!c.name) return;
    var etichetta = c.name;
    var valore = c.value;
    if (valore) righe.push(etichetta + ': ' + valore);
  });
  var corpo = righe.join('\n');
  window.location.href = 'mailto:' + destinatario +
    '?subject=' + encodeURIComponent(oggetto) +
    '&body=' + encodeURIComponent(corpo);
  return false;
}
