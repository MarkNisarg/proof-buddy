import { useState } from 'react';

const useHighlight = () => {
  const [startPosition, setStartPosition] = useState(0);

  const handleHighlight = (element) => {
    var fullText= element.target.value;
    var selectedText = (element.target.value).substring(element.target.selectionStart, element.target.selectionEnd);
    var caretPosition = element.target.selectionStart;
    const keywords = ['length', 'rest', 'append', 'null?', 'null', 'if', 'first'];

    var keyword = '';
    var sub = '';
    var selectStart = 0;
    var selectEnd = 0;

    for (let i = 0; i < keywords.length; i++) {
      keyword = keywords[i];
      for (let j = 0; j < fullText.length - (keyword.length - 1); j++) {
        sub = fullText.substring(j, j + keyword.length);
        if (sub == keyword && j <= caretPosition && caretPosition <= j + keyword.length - 1) {
          selectStart = j;
          selectEnd = j + keyword.length;
          element.target.setSelectionRange(selectStart, selectEnd);
          element.target.style.setProperty('--selectBGColor', '#ffe600');
          break;
        }
      }

      if (selectEnd != 0){
        break;
      }
    }

    if (selectedText.toString() == '') {
      var rightCharacter = (fullText.substring(caretPosition, caretPosition + 1));
      var intermediate = 0;
      var matchingParenthesis = '';
      var success = false;
      if (rightCharacter == '(') {
        matchingParenthesis = ')';
        for(let i = caretPosition + 1; i < fullText.length; i++){
          highlightMatchingParenthesis(i);
          if(success)
            break;
        }
      }
      if (rightCharacter == ')') {
        matchingParenthesis = '('
        for(let i = caretPosition - 1; i >= 0; i--){
          highlightMatchingParenthesis(i);
          if(success)
            break;
        }
      }
    }

    setStartPosition(caretPosition);

    function highlightMatchingParenthesis(i){
      sub = fullText.substring(i, i + 1);
      if (sub == matchingParenthesis && intermediate == 0) {
        if (caretPosition < i) {
          element.target.setSelectionRange(caretPosition, i + 1);
          element.target.style.setProperty('--selectBGColor', 'DeepSkyBlue');
        }
        else {
          element.target.setSelectionRange(i, caretPosition + 1);
          element.target.style.setProperty('--selectBGColor', 'DeepSkyBlue');
        }
        success = true;
      }

      if (sub == rightCharacter) {
        intermediate++;
      }
      if (sub == matchingParenthesis) {
        intermediate--
      }
    }
  }
  return [handleHighlight, startPosition];
}

export { useHighlight }
