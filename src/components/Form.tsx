import React, { Component } from "react";
import Select from "react-select";

import "../index.css"; // Style with tailwindcss

interface MySelectOptions {
  selectOption: any | null;
  selectOptionMult: any | null;
  isClearable: boolean;
  isSearchable: boolean;
}

class Form extends Component<{}, MySelectOptions> {
  options = [
    { value: "rua1", label: "Rua 10" },
    { value: "rua2", label: "Rua 20" },
    { value: "rua3", label: "Rua 30" },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      isSearchable: true,
      isClearable: true,
      selectOption: null,
      selectOptionMult: null,
    };
  }

  handleChanges = (selectOption: any) => {
    this.setState({ selectOption });
  };

  handleChangesMult = (selectOptionMult: any) => {
    this.setState({ selectOptionMult });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { selectOption, selectOptionMult } = this.state;

    if (selectOption && selectOptionMult) {
      selectOptionMult.forEach((value: any) => {
        console.log(value.value);
      });
      console.log(
        `From is ${selectOption.value}, End is ${selectOptionMult.value}`,
      );
    } else alert("Selecione alguma Rua");
  };

  render(): React.ReactNode {
    return (
      <>
        <section className="container p-4  m-4 space-x-4  border-black border rounded-lg font-sans">
          <form onSubmit={this.handleSubmit}>
            <h3>Rotas</h3>
            <div className="flex flex-col space-y-1 ">
              <div className=" flex flex-row items-stretch gap-1">
                <label className="py-1">Partida:</label>
                <Select
                  className="basis-1/3"
                  isClearable={this.state.isClearable}
                  isSearchable={this.state.isSearchable}
                  options={this.options}
                  value={this.state.selectOption}
                  onChange={this.handleChanges}
                />
              </div>

              <div className="flex flex-row items-stretch gap-1">
                <label className="py-1">Passar:</label>
                <Select
                  className="basis-1/2"
                  isClearable={this.state.isClearable}
                  isSearchable={this.state.isSearchable}
                  options={this.options}
                  value={this.state.selectOptionMult}
                  onChange={this.handleChangesMult}
                  isMulti
                />
              </div>
            </div>

            <button type="submit">Enviar</button>
          </form>
        </section>
      </>
    );
  }
}

export default Form;
