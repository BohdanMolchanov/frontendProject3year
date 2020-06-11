import React, { Fragment } from "react";
import { userService, authenticationService, cureService } from "@/_services";
import { UserCureBlock } from "@/_components";
import { Select, Input } from "@/_func_components";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      userFromApi: null,
      cures: null,
      pageNumber: 1,
      cureIntName: "",
      internationalCureNamesList: "",
      selectIntNameText: "",
      searchFromSelect: false,
      inputValue: "",
      allCuresByIntName: "",
      ukrSearch: "",
    };
  }
  updatePage = (page, cureValue) => {
    const { cures, cureIntName, searchFromSelect } = this.state;
    if (this.selectRef.current)
      if (this.selectRef.current.value === "Виберіть ліки") {
        this.setState({
          pageNumber: page,
        }),
          cureService
            .getAll(page)
            .then((result) => this.setState({ cures: result }));
        return null;
      }
    if (cureValue || cureIntName) {
      cureValue = !cureValue ? cureIntName : cureValue;
      this.setState({
        pageNumber: page,
      }),
        cureService.getByIntName(page, cureValue).then((result) => {
          this.setState({ cures: result });
        });
    } else
      this.setState({
        pageNumber: page,
      }),
        cureService
          .getAll(page)
          .then((result) => this.setState({ cures: result }));
    console.log(cures);
  };
  componentDidMount() {
    const { currentUser } = this.state;
    this.updatePage(1);
    cureService.getNames().then((result) =>
      this.setState({
        internationalCureNamesList: result,
        cureIntName: result[0],
      })
    );
  }

  handleNameSelectChange = (e) => {
    this.setState({
      selectIntNameText: this.selectRef.current.value,
      cureIntName: e.target.value,
      searchFromSelect: true,
    }),
      this.updatePage(1, e.target.value);
    cureService.getByInternationalName(e.target.value).then(
      (result) => this.setState({ allCuresByIntName: result }),
      (error) => console.log(error.message)
    );
    console.log();
    // cureService.getByInternationalName(e.target.value).then(
    //   (result) => {
    //     console.log(result);
    //     this.setState({ internationalCureNamesList: result });
    //   },
    //   (error) => this.setState({ status: error.message })
    // );
  };

  handleInputChange = (e) => {
    const { allCuresByIntName } = this.state;
    var newCuresList = allCuresByIntName.filter((element) =>
      element.nameUkainian.includes(e.target.value.toUpperCase())
    );
    console.log(newCuresList);
    this.setState({
      inputValue: e.target.value,
      ukrSearch: newCuresList,
    });
  };

  handleNextPageClick = ({ target }) => {
    const btnType = target.getAttribute("data-name");

    let { pageNumber } = this.state;
    console.log(pageNumber);
    switch (btnType) {
      case "next":
        this.updatePage(pageNumber + 1);
        break;
      case "previous":
        this.updatePage(pageNumber - 1);
        break;
      default:
        null;
    }
  };
  selectRef = React.createRef();
  nameRef = React.createRef();
  render() {
    const {
      internationalCureNamesList,
      cureIntName,
      currentUser,
      cures,
      pageNumber,
      inputValue,
      ukrSearch,
      selectIntNameText,
    } = this.state;
    return (
      <div className="home-page">
        {internationalCureNamesList && (
          <Select
            reference={this.selectRef}
            list={internationalCureNamesList}
            value={cureIntName}
            onChange={this.handleNameSelectChange}
            keyText="_intname"
          />
        )}
        {selectIntNameText && (
          <Input
            type="text"
            text="Торгівельна назва"
            reference={this.nameRef}
            onChange={this.handleInputChange}
            value={inputValue}
            classNames="home-page-input"
          />
        )}
        {inputValue == "" ? (
          <Fragment>
            {cures && <UserCureBlock curesList={cures} />}
            <div>
              {cures && cures.length == 10 && (
                <button
                  type="button"
                  className="pagination-button"
                  data-name="next"
                  onClick={this.handleNextPageClick}
                >
                  Вперед
                </button>
              )}
              {pageNumber !== 1 && (
                <button
                  type="button"
                  className="pagination-button"
                  data-name="previous"
                  onClick={this.handleNextPageClick}
                >
                  Назад
                </button>
              )}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {cures && <UserCureBlock curesList={ukrSearch} />}
          </Fragment>
        )}
      </div>
    );
  }
}

export { HomePage };
