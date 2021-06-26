import getCurrencies from "./getCurrencies";
const countryData = require("country-data");

const parsedCookies = () => {
  const str = decodeURIComponent(document.cookie).split("; ");
  const result = {};
  for (let i = 0; i < str.length; i++) {
    const cur = str[i].split("=");
    result[cur[0]] = cur[1];
  }
  return result;
};

const displayCurrency = (price, currency, locale) => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    price
  );
};

const unitToStandard = (unitValue, currency) => {
  const price = unitValue / 10 ** currencyInfo(currency).decimalPlaces;
  return price;
};

const displayPriceFromUnit = (
  unitValue,
  currencyFrom,
  currencyTo,
  convertRate,
  locale
) => {
  const price = unitToStandard(unitValue, currencyFrom);
  const display =
    currencyFrom !== currencyTo
      ? displayConversion(
          price,
          price * (convertRate || 1),
          currencyFrom,
          currencyTo,
          "en-US",
          locale
        )
      : displayCurrency(price, currencyFrom, currencyTo, "en-US");
  return display;
};
const displayPrice = (price, currencyFrom, currencyTo, convertRate, locale) => {
  const display =
    currencyFrom !== currencyTo
      ? displayConversion(
          price,
          price * (convertRate || 1),
          currencyFrom,
          currencyTo,
          "en-US",
          locale
        )
      : {
          display: displayCurrency(price, currencyFrom, currencyTo, "en-US"),
          float: price,
        };
  return display;
};

const parseWishlistPrices = (wishlist, aliasCurrency, localeContext) => {
  wishlist.wishlistItems.forEach((item) => {
    item.price = parsePrice(item.price, item.currency);
    item.price = displayPrice(
      item.price,
      item.currency,
      item.currency,
      1,
      localeContext
    );
  });
};

const parseConvertWishlistPrices = (
  wishlist,
  clientCurrency,
  localeContext,
  exchangeRate
) => {
  wishlist.wishlistItems.forEach((item) => {
    item.price = parsePrice(item.price, item.currency);
    item.price = displayPrice(
      item.price,
      item.currency,
      clientCurrency,
      exchangeRate,
      localeContext
    );
  });
};

const parseCartPrices = (
  cart,
  clientCurrency,
  localeContext,
  exchangeRates
) => {
  const aliases = Object.keys(cart.aliasCarts);
  aliases.forEach((alias) => {
    const aliasCart = cart.aliasCarts[alias];
    parseAliasCartPrices(
      aliasCart,
      clientCurrency,
      localeContext,
      exchangeRates
    );
  });
};
const parseAliasCartPrices = (
  aliasCart,
  clientCurrency,
  localeContext,
  exchangeRates
) => {
  aliasCart.totalPrice = parsePrice(
    aliasCart.totalPrice,
    aliasCart.alias.currency
  );
  aliasCart.totalPrice = displayPrice(
    aliasCart.totalPrice,
    aliasCart.alias.currency,
    clientCurrency !== "noConversion"
      ? clientCurrency
      : aliasCart.alias.currency,
    aliasCart.alias.currency !== clientCurrency &&
      clientCurrency !== "noConversion"
      ? 1 / exchangeRates[aliasCart.alias.currency]
      : 1,
    localeContext
  );
  const items = Object.keys(aliasCart.items);
  items.forEach((item) => {
    const itemObj = aliasCart.items[item];
    itemObj.price = parsePrice(itemObj.price, aliasCart.alias.currency);
    itemObj.price = displayPrice(
      itemObj.price,
      aliasCart.alias.currency,
      clientCurrency !== "noConversion"
        ? clientCurrency
        : aliasCart.alias.currency,
      aliasCart.alias.currency !== clientCurrency &&
        clientCurrency !== "noConversion"
        ? 1 / exchangeRates[aliasCart.alias.currency]
        : 1,
      localeContext
    );
  });
};
const parseOrderPrices = (order, locale) => {
  const parse = (price) =>
    displayPrice(
      parsePrice(price, order.tender.currency),
      order.tender.currency,
      order.tender.currency,
      1,
      locale
    );
  order.tender.amount = parse(order.tender.amount);
  order.tender.afterConversion = order.tender.afterConversion
    ? parse(order.tender.afterConversion)
    : order.tender.afterConversion;

  const gifts = order.gifts;
  gifts.forEach((gift) => {
    const itemObj = gift.item;
    itemObj.price = parse(itemObj.price);
    gift.price = parse(gift.price);
  });
};

const displayConversion = (
  price,
  convertedPrice,
  fromCurrency,
  toCurrency,
  fromLocale,
  toLocale
) => {
  return {
    converted: displayCurrency(convertedPrice, toCurrency, toLocale),
    display: displayCurrency(price, fromCurrency, fromLocale),
    float: price,
  };
};

const chooseCurrency = (locale) => {
  if (locale.countryCode) {
    const currencies = getCurrencies(locale.countryCode);
    //replace with form to select currency and set document.cookie
    if (currencies.length > 1)
      return alert(
        "Here we would ask the user to pick currency: " + currencies.join(", ")
      );

    document.cookie = `currency= ${currencies[0]}`; // we need to give the user a way to change the currency later
  } else {
    //replace with form to select currency based on language and set document.cookie
    alert(
      `Here the user would pick currency from list of currencies. Currencies used in countries where people speak languageCode: "${locale.languageCode}" could be at top of list`
    );
  }
};
const getCurrencyList = (locale) => {
  let matchingCurrencies = locale ? getCurrencies(locale?.countryCode) : [];
  const ratesApiCurrencies = [
    "GBP",
    "HKD",
    "IDR",
    "ILS",
    "DKK",
    "INR",
    "CHF",
    "MXN",
    "CZK",
    "SGD",
    "THB",
    "HRK",
    "EUR",
    "MYR",
    "NOK",
    "CNY",
    "BGN",
    "PHP",
    "PLN",
    "ZAR",
    "CAD",
    "ISK",
    "BRL",
    "RON",
    "NZD",
    "TRY",
    "JPY",
    "RUB",
    "KRW",
    "USD",
    "AUD",
    "HUF",
    "SEK",
  ];

  let filteredAPICurrencies = ratesApiCurrencies.filter(
    (cur) => !matchingCurrencies.includes(cur)
  );
  matchingCurrencies = matchingCurrencies
    .map((cur) => ({
      code: cur,
      symbol: currencyInfo(cur).symbol,
      name: countryData.currencies[cur].name,
      match: true,
    }))
    .sort((a, b) => (a.name[0] > b.name[0] ? 1 : -1));

  filteredAPICurrencies = filteredAPICurrencies
    .map((cur) => ({
      code: cur,
      symbol: currencyInfo(cur).symbol,
      name: countryData.currencies[cur].name,
    }))
    .sort((a, b) => (a.name[0] > b.name[0] ? 1 : -1));

  return [
    ...matchingCurrencies,
    {
      code: "noConversion",
      symbol: "N/A",
      name: "Not Listed/Don't Convert Prices",
    },
    ...filteredAPICurrencies,
  ];
};

const clientLocale = (user) => {
  const cookies = parsedCookies();
  return user ? user?.locale : cookies.locale.locale;
};

const clientCurrency = (user) => {
  const cookies = parsedCookies();
  return user && user?.currency ? user?.currency : cookies.currency;
};

const toDotDecimal = (price) => {
  return parseFloat(
    price.replace(/(,|\.)([0-9]{3})/g, `$2`).replace(/(,|\.)/, ".")
  );
};

const parsePrice = (price, currency) => {
  return toCurrencyDecimals(unitToStandard(price, currency), currency);
};

const toCurrencyDecimals = (val, currency) => {
  const fraction = Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .formatToParts("1")
    .find((part) => part.type === "fraction");
  const decimalPlaces = fraction ? fraction.value.length : 0;

  return (+val).toFixed(decimalPlaces);
};

const toSmallestUnit = (price, currency) => {
  const dotDec = toDotDecimal(price);
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .formatToParts(dotDec)
    .reduce((a, c) => {
      if (c.type === "integer" || c.type === "fraction") return a + c.value;
      return a;
    }, "");
};

const getSymbol = (currency) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .formatToParts("1")
    .find((part) => (part.type = "currency")).value;
};

const isValidPrice = (value, decimalPlaces) => {
  const correctDecimalPlaces =
    value.split(/([,||.])/g).reverse()[0].length === decimalPlaces;
  const commasNumbersPeriods =
    /^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]+){0,1}$/.test(value) ||
    /^(0|[1-9][0-9]{0,2}(?:(.[0-9]{3})*|[0-9]*))(,[0-9]+){0,1}$/.test(value);

  return correctDecimalPlaces && commasNumbersPeriods;
};

const currencyInfo = (currency, locale = "en") => {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).formatToParts("1000");

  let separator;
  let decimal;
  let decimalPlaces;
  let symbol;
  parts.forEach((p) => {
    switch (p.type) {
      case "group":
        separator = p.value;
        break;
      case "decimal":
        decimal = p.value;
        break;
      case "fraction":
        decimalPlaces = p.value.length;
        break;
      case "currency":
        symbol = p.value;
        break;
      default:
      // code block
    }
  });
  const info = { separator, decimal, decimalPlaces, symbol };
  if (info.decimalPlaces === undefined) info.decimalPlaces = 0;
  if (info.decimal === undefined) info.decimal = null;
  return info;
};

export {
  unitToStandard,
  currencyInfo,
  isValidPrice,
  getSymbol,
  toSmallestUnit,
  toCurrencyDecimals,
  toDotDecimal,
  clientCurrency,
  clientLocale,
  displayCurrency,
  parsedCookies,
  chooseCurrency,
  displayConversion,
  displayPriceFromUnit,
  displayPrice,
  parsePrice,
  parseCartPrices,
  parseOrderPrices,
  parseAliasCartPrices,
  parseConvertWishlistPrices,
  parseWishlistPrices,
  getCurrencyList,
};
