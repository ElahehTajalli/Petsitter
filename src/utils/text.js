import usu from 'unicode-string-utils'
export const convertDigitsToFarsi = text => {
  const numberDic = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  }
  return String(text).replace(/[0123456789]/g, (s) => {
    return numberDic[s]
  })
}

export const convertDigitsToLatin = text => {
  var numberDic = {
    '۰': 0,
    '۱': 1,
    '۲': 2,
    '۳': 3,
    '۴': 4,
    '۵': 5,
    '۶': 6,
    '۷': 7,
    '۸': 8,
    '۹': 9
  }
  return text.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (s) => {
    return numberDic[s]
  })
}

export const unicodeAwareMarkTextBasedOnHighlights = summary => {
  let {
    text, highlights
  } = summary
  let markedTextArray = []
  let markedText = text
  let actualStart = 0
  let start = 0
  let len = 0
  let partOne = ''
  let partTwo = ''
  let className = ''
  highlights.forEach(highlight => {
    start = highlight.offset - actualStart
    len = highlight.length
    partOne = usu.substring(markedText, 0, start)
    partTwo = usu.substring(markedText, start, start + len)
    markedText = usu.substring(markedText, start + len)
    actualStart = usu.length(text) - usu.length(markedText)
    className = highlight.type ? highlight.type.split('_').pop() : 'main'
    markedTextArray.push(`${partOne}<b class="${className}">${partTwo}</b>`)
  })
  let highlightedTxt = markedTextArray.join('') + markedText
  return highlightedTxt
}

export const nl2br = txt => {
  var breakTag = '<br />'
  return (txt + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

export const shortenText = (txt, limit) => {
  if (txt.length < limit - 1) {
    return txt
  }
  return `${txt.substring(0, limit)}…`
}

export const highlightTerms = (terms, text) => {
  let highlighted = text
  for (let i = 0; i < terms.length; i++) {
    const term = terms[i]
    highlighted = highlighted.replace(new RegExp(term, 'gi'), match => {
      return '<mark class="highlight">' + match + '</mark>'
    })
  }
  return highlighted
}
