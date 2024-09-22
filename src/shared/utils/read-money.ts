export function readMoneyVN(data: number | string) {
  let amount = data;
  let result = '';
  const pronounce = [
    '',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
  ];
  if (typeof data === 'string') {
    amount = +data;
  }
  if (!isNaN(amount as number)) {
    const totalLength = amount.toString().length;

    const readThreeDigits = (threeDigit: any) => {
      const length = threeDigit.toString().length;
      let hundreds = Math.floor((threeDigit % 1_000) / 100);
      let tens = Math.floor((threeDigit % 100) / 10);
      let units = threeDigit % 10;
      let resultThreeDigits = '';

      // hundreds
      if (length >= 3 && +threeDigit) {
        if (hundreds !== 0) {
          resultThreeDigits += `${pronounce[hundreds]} trăm `;
        } else if (hundreds === 0 && totalLength > 3) {
          resultThreeDigits += `không trăm `;
        }
      }
      // tens
      if (length >= 2) {
        if (tens === 0 && units !== 0) {
          resultThreeDigits += 'linh ';
        } else if (tens === 0 && units === 0) {
          resultThreeDigits += ''
        } else if (tens === 1) {
          resultThreeDigits += 'mười ';
        } else {
          resultThreeDigits += `${pronounce[tens]} mươi `;
        }
      }
      // units
      if (units === 5 && tens !== 0) {
        resultThreeDigits += 'lăm';
      } else if (units === 5 && tens === 0) {
        resultThreeDigits += 'năm';
      } else if (tens >= 2 && units === 1) {
        resultThreeDigits += 'mốt';
      } else {
        resultThreeDigits += pronounce[units];
      }
      resultThreeDigits = resultThreeDigits.trim();
      return resultThreeDigits;
    };

    function splitIntoLabeledGroups() {
      const labels = [
        'hundreds',
        'thousands',
        'millions',
        'billions',
        'trillions',
        'quadrillions',
        'quintillions',
      ];
      let numStr = amount.toString();
      let result: any = {};
      let index = 0;
      while (numStr.length > 0) {
        let chunk = numStr.slice(-3);
        result[labels[index]] = chunk;
        numStr = numStr.slice(0, -3);
        index++;
      }
      return result;
    }
    const splitNumber = splitIntoLabeledGroups();
    Object.entries(splitNumber).forEach(([key, value]) => {
      if (readThreeDigits(value)) {
        if (key === 'hundreds') {
          result = readThreeDigits(value);
        } else if (key === 'thousands') {
          result = `${readThreeDigits(value)} nghìn ` + result;
        } else if (key === 'millions') {
          result = `${readThreeDigits(value)} triệu ` + result;
        } else if (key === 'billions') {
          result = `${readThreeDigits(value)} tỷ ` + result;
        } else if (key === 'trillions') {
          result = `${readThreeDigits(value)} nghìn tỷ ` + result;
        } else if (key === 'quadrillions') {
          result = `${readThreeDigits(value)} triệu tỷ ` + result;
        } else {
          result = 'NaN';
        }
      }
    });
    result = result + ' đồng';

    return result;
  }
  return null;
}
