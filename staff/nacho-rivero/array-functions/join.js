/**
 * Method returns a new string concatening all elements with a separator introduced. If is not introduced () or it is (',') (''), it returns the elements separated with coma.
 * @param {*} array The array to modificate.
 * @param {*} separator The element to add and use to separate each element.
 */

function join(array, separator) {

    var string = '';

    if (separator == '' || separator == undefined) {

      separator = ',';

    };

      for (var i = 0; i < array.length; i++) {

        if (i === array.length - 1) {

          string += array[i];

        } else {

          string += array[i] + separator;

        }

        return string;
        
      }

    }
    
  