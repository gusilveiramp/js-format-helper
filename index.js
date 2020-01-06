/**
 * formata Phone para (00) 0000-00000
 */
export const formatPhone = value => {
  if(!value) return;
  return value
    .replace(/\D/g, '') // remove qualquer caratere que não seja número
    .replace(/(\d{0})(\d)/, '$1($2') // adiciona parenteses antes do primeiro número
    .replace(/(\d{2})(\d)/, '$1) $2') // adiciona parentes depois de 2 numeros
    .replace(/(\d{5})(\d)/, '$1-$2') // adiciona o traço depois de 4 numeros
    .replace(/(\d{4})\d+?$/, '$1') // captura 4 numeros e não deixa digitar mais nada.
};

/**
 * formata CEP para 00.000-000
 */
export const formatCep = value => {
  if(!value) return;
  return value
    .replace(/\D/g, '') // remove qualquer caratere que não seja número
    .replace(/(\d{2})(\d)/, '$1.$2') // adiciona o ponto
    .replace(/(\d{3})(\d)/, '$1-$2') // adiciona o traço
};

/**
 * formata números para X.000, X0.000, X00.000 e X.000.000
 */
export const formatNumber = value => {
  if(!value) return;
  value = value.replace(/\D/g, '') // remove qualquer caractere que nao seja numero;
  if(value.length == 4) { // se for 1.000
    return value
      .replace(/\D/g, '') 
      .replace(/(\d{1})(\d)/, '$1.$2') // adiciona o ponto depois do primeiro caractere
  }
  if(value.length == 5) {// se for >= 10.000
    return value
      .replace(/\D/g, '') // remove qualquer caractere que nao seja numero
      .replace(/(\d{2})(\d)/, '$1.$2') // adiciona o ponto depois do segundo caractere
  }
  if(value.length == 6) {// se for >= 100.000
    return value
      .replace(/\D/g, '') // remove qualquer caractere que nao seja numero
      .replace(/(\d{3})(\d)/, '$1.$2') // adiciona o ponto depois do terceiro caractere
  }
  if(value.length >= 7) {// se for >= 1.000.000
    return value
      .replace(/\D/g, '') // remove qualquer caractere que nao seja numero
      .replace(/(\d{1})(\d)/, '$1.$2') // adiciona o ponto depois do primeiro caractere
      .replace(/(\d{5})(\d)/, '$1.$2') // adiciona o ponto depois do quinto caractere
  }
  return value;
}

/**
 * formata data para DD/MM/AAAA
 */
export const formatDate = value => {
  var date = new Date(value); // converte em Date
  if (!isNaN(date.getTime())) { // validação
    var day = date.getDate().toString(); 
    var month = (date.getMonth() + 1).toString();

    date = (month[1] ? month : '0' + month[0]) + '/' +
    (day[1] ? day : '0' + day[0]) + '/' + 
    date.getFullYear();
  }
  return date;
};

/**
 * formata hora para HH:MM
 */
export const formatHour = value => {
  var date = new Date(value);
  if (!isNaN(date.getTime())) { 
    var hour = (date.getHours() + 1).toString();
    var minutes = (date.getMinutes() + 1).toString();

    date = (hour[1] ? hour : '0' + hour[0]) + ':' +
    (minutes[1] ? minutes : '0' + minutes[0]);
  }
  return date;
};

/** 
 * formata dinheiro para X.000,00 ou X,000.00
 */
export const formatMoney = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};