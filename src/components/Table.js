import React from "react";
import PropTypes from "prop-types";

class Table extends React.Component {
  static propTypes = {
    // You can declare that a prop is a specific JS primitive (optionally):
    // <propertyName>: PropTypes.array|bool|func|number|object|string|symbol(.isRequired),
    // <propertyName>: PropTypes.array|bool|func|number|object|string|symbol(.isRequired),
    // e.g.:
    // children: React.PropTypes.string,
  };

  static defaultProps = {
    // <propertyName>: <defaultValue>,
    // <propertyName>: <defaultValue>,
    // e.g.:
    // children: 'Hello World!',
  };

  handleInputChange = event => {
    console.log("handleInputChange - event.target: ", event.target);
  };

  handleInputKeyDown = event => {
    // 1. Define the arrow key (/ character) values to react to:
    const arrowKeysDirections = {
      left: "ArrowLeft",
      up: "ArrowUp",
      right: "ArrowRight",
      down: "ArrowDown"
    };
    const keyPressed = event.key;
    const inputElement = event.target;

    // 2. Check if an arrow key (value) was pressed:
    const isArrowKeyPressed = Object.values(arrowKeysDirections).includes(
      keyPressed
    );

    // 3. If arrow key was pressed, then stop prevent other handlers to react to keypress and start processing cell naviation behaviour:
    if (isArrowKeyPressed) {
      switch (keyPressed) {
        case arrowKeysDirections.right:
          console.log("arrow right - key pressed.");
          console.log("input.selectionStart: ", inputElement.selectionEnd);

          if (inputElement.selectionEnd === inputElement.value.length) {
            // Get the closest td - parent element
            const parentTdCell = inputElement.closest("td");
            console.log("parentTdCell", parentTdCell);

            // Get next td cell:
            let nextTdCell = parentTdCell.nextSibling;
            console.log("nextTdCell", nextTdCell);

            // If there's a next sibling ("Td" : table data - cell)
            if (!!nextTdCell) {
              // Get the input element inside of the td - element:
              let inputOfNextTdCell = nextTdCell.querySelector("input");

              // If the td cell has a child element of type input, focus it and terminate the switch-case:
              if (!!inputOfNextTdCell) {
                inputOfNextTdCell.focus();
                break;
              }

              // When an input element couldn't be found, check if there's a next sibling (td-cell) to the currently checked one:
              while (!inputOfNextTdCell) {
                nextTdCell = nextTdCell.nextSibling;
                // If there's a next cell then check for an input element inside it and focus it if it exists, otherwise repeat the search:
                if (!!nextTdCell) {
                  let inputOfNextTdCell = nextTdCell.querySelector("input");

                  if (!!inputOfNextTdCell) {
                    inputOfNextTdCell.focus();
                    break;
                  }
                } else {
                  break;
                }
              }
            }
          }
          break;

        case arrowKeysDirections.left:
          console.log("arrow left - key pressed.");
          console.log("input.selectionStart: ", inputElement.selectionStart);

          if (inputElement.selectionStart === 0) {
            // Get the closest td - parent element
            const parentTdCell = inputElement.closest("td");
            console.log("parentTdCell", parentTdCell);

            // Get previous td cell:
            let previousTdCell = parentTdCell.previousSibling;
            console.log("previousTdCell - first call:" + previousTdCell);

            // If there's a previous sibling ("Td" : table data - cell)
            if (!!previousTdCell) {
              // Get the input element inside of the td - element:
              let inputOfPreviousTdCell = previousTdCell.querySelector("input");

              if (!!inputOfPreviousTdCell) {
                inputOfPreviousTdCell.focus();
                break;
              }

              // When an input element couldn't be found, check if there's a next sibling (td-cell) to the currently checked one:
              while (!inputOfPreviousTdCell) {
                console.log("previousTdCell - while loop:" + previousTdCell);

                previousTdCell = previousTdCell.previousSibling;
                // If there's a next cell then check for an input element inside it and focus it if it exists, otherwise repeat the search:
                if (!!previousTdCell) {
                  inputOfPreviousTdCell = previousTdCell.querySelector("input");

                  if (!!inputOfPreviousTdCell) {
                    inputOfPreviousTdCell.focus();
                    break;
                  }
                } else {
                  break;
                }
              }
            }
          }

          break;

        case arrowKeysDirections.up:
          console.log("arrow up - key pressed.");

          // Get the closest td - parent element
          const parentTdCell = inputElement.closest("td");
          const parentTdCellPosition = parentTdCell.cellIndex;
          const parentTableRow = inputElement.closest("tr");

          console.log("parentTdCell", parentTdCell);
          console.log("parentTdCellPosition", parentTdCellPosition);
          console.log("parentTableRow ", parentTableRow);

          // Get previous table row:
          let previousTableRow = parentTableRow.previousSibling;
          console.log("previousTableRow ", previousTableRow);

          // If there's a previous table row above the current one, then:
          if (!!previousTableRow) {
            // Get the table cell in the previous table row in the same position as the original one:
            let tdInputCellAbove = previousTableRow.cells[
              parentTdCellPosition
            ].querySelector("input");

            // If there's an input field in the table data - cell above the current one, focus it and exit the switch-case:
            if (!!tdInputCellAbove) {
              tdInputCellAbove.focus();
              break;
            }

            // If there wasn't an input in the table data - cell. Check the next previous row:
            while (!tdInputCellAbove) {
              previousTableRow = previousTableRow.previousSibling;
              // If there's a next cell then check for an input element inside it and focus it if it exists, otherwise repeat the search:
              if (!!previousTableRow) {
                tdInputCellAbove = previousTableRow.cells[
                  parentTdCellPosition
                ].querySelector("input");

                if (!!tdInputCellAbove) {
                  tdInputCellAbove.focus();
                  break;
                }
              } else {
                break;
              }
            }
          }

          break;

        case arrowKeysDirections.down:
          {
            console.log("arrow down - key pressed.");

            // Get the closest td - parent element
            const parentTdCell = inputElement.closest("td");
            const parentTdCellPosition = parentTdCell.cellIndex;
            const parentTableRow = inputElement.closest("tr");

            console.log("parentTdCell", parentTdCell);
            console.log("parentTdCellPosition", parentTdCellPosition);
            console.log("parentTableRow ", parentTableRow);

            // Get previous table row:
            let nextTableRow = parentTableRow.nextSibling;
            console.log("nextTableRow ", nextTableRow);

            if (!!nextTableRow) {
              let tdInputCellBelow = nextTableRow.cells[
                parentTdCellPosition
              ].querySelector("input");

              if (!!tdInputCellBelow) {
                tdInputCellBelow.focus();
              }

              // If there wasn't an input in the table data - cell. Check the next previous row:
              while (!tdInputCellBelow) {
                nextTableRow = nextTableRow.nextSibling;
                // If there's a next cell then check for an input element inside it and focus it if it exists, otherwise repeat the search:
                if (!!nextTableRow) {
                  tdInputCellBelow = nextTableRow.cells[
                    parentTdCellPosition
                  ].querySelector("input");

                  if (!!tdInputCellBelow) {
                    tdInputCellBelow.focus();
                    break;
                  }
                } else {
                  break;
                }
              }
            }
          }

          break;
        default:
          break;
      }
    } else {
      // 3.2. Exit this function.
      return;
    }
  };

  render() {
    return (
      <table className="sc-bbmXgH table table-borderless text-uppercase tChbu">
        <thead className="sc-jnlKLf iTmSNM">
          <tr>
            <th scope="col" />
            <th scope="col">
              <div>XS</div>
            </th>
            <th scope="col">
              <div>S</div>
            </th>
            <th scope="col">
              <div>M</div>
            </th>
            <th scope="col">
              <div>L</div>
            </th>
            <th scope="col">
              <div>XL</div>
            </th>
            <th scope="col">
              <div>QTY</div>
            </th>
            <th scope="col">
              <div>DELIVERY DATE</div>
            </th>
          </tr>
        </thead>
        <tbody className="sc-fYxtnH hMTBmv">
          <tr>
            <th scope="row" rowSpan="1">
              412 ginger
              <img
                className="sc-cIShpX ggXYqv"
                src="filesystem:http://localhost:3000/persistent/images/produkts/30014_412a.png"
              />
            </th>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: 25.00 €</li>
                    <li>Retail Price: 50.00 €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>2019-03-13</td>
          </tr>
          <tr>
            <th scope="row" rowSpan="1">
              611 nile
            </th>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: 25.00 €</li>
                    <li>Retail Price: 50.00 €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: 25.00 €</li>
                    <li>Retail Price: 50.00 €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: 25.00 €</li>
                    <li>Retail Price: 50.00 €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>2019-03-13</td>
          </tr>
          <tr>
            <th scope="row" rowSpan="1">
              412 ginger
              <img
                className="sc-cIShpX ggXYqv"
                src="filesystem:http://localhost:3000/persistent/images/produkts/30014_412a.png"
              />
            </th>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: undefined €</li>
                    <li>Retail Price: undefined €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="orderDetailsCell">
                <input
                  type="text"
                  defaultValue=""
                  onKeyDown={this.handleInputKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="sc-kafWEX orderPositionTooltip hJSLai">
                  <ul className="list-unstyled">
                    <li>Trade Price: 25.00 €</li>
                    <li>Retail Price: 50.00 €</li>
                    <li>Stocks: 0</li>
                  </ul>
                </div>
                <div className="sc-hEsumM fMUEXM" />
                <div className="sc-tilXH fchazo">ST</div>
              </div>
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>
              <div className="sc-gGBfsJ gLkJqO" />
            </td>
            <td>2019-03-13</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
