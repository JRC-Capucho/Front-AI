import React, { Component } from "react";
import Select from "react-select";
import map from "./map.png";

import axios from "axios";

import "../index.css"; // Style with tailwindcss

interface MySelectOptions {
  selectOption: any | null;
  selectOptionMult: [] | null;
  isClearable: boolean;
  isSearchable: boolean;
  offset: Offset[];
  startPoint: any | null;
  finalPoint: any | null;
  res: any;
}
interface Offset {
  x: number;
  y: number;
  name: string;
}

class Form extends Component<{}, MySelectOptions> {
  options = [
    { value: "rua1", label: "Rua 1" },
    { value: "rua2", label: "Rua 2" },
    { value: "rua3", label: "Rua 3" },
    { value: "rua4", label: "Rua 4" },
    { value: "rua5", label: "Rua 5" },
    { value: "rua6", label: "Rua 6" },
    { value: "rua7", label: "Rua 7" },
    { value: "rua8", label: "Rua 8" },
    { value: "rua9", label: "Rua 9" },
    { value: "rua10", label: "Rua 10" },
    { value: "rua11", label: "Rua 11" },
    { value: "rua12", label: "Rua 12" },
    { value: "rua13", label: "Rua 13" },
    { value: "rua14", label: "Rua 14" },
    { value: "rua15", label: "Rua 15" },
    { value: "rua16", label: "Rua 16" },
    { value: "rua17", label: "Rua 17" },
    { value: "rua18", label: "Rua 18" },
    { value: "rua19", label: "Rua 19" },
    { value: "rua20", label: "Rua 20" },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      isSearchable: true,
      isClearable: true,
      selectOption: null,
      selectOptionMult: null,
      offset: [],
      startPoint: null,
      finalPoint: null,
      res: {},
    };
  }

  handleChanges = (selectOption: any) => {
    this.setState({ selectOption, startPoint: selectOption });
  };

  handleChangesMult = (selectOptionMult: any) => {
    this.setState({ selectOptionMult, endPoint: selectOptionMult });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const url: string = "http://localhost:5000/";

    // const data = { begin: "ARAD", ends: "BUCARESTE" };
    const { selectOption, selectOptionMult } = this.state;
    const { startPoint, endPoint } = this.state;

    if (selectOption && selectOptionMult) {
      const data: { begin?: string; ends: string[] } = {
        ends: selectOptionMult.map((value) => value.value),
      };

      data.begin = selectOption.value;

      if (data)
        axios
          .post(url + "custom_uniform", data)
          .then((res) => {
            console.log("Data sent successfully", res.data);
            this.setState({ res: res.data });
          })
          .catch((err) => {
            console.error("Error: ", err);
          });
    } else alert("Selecione alguma Rua");
  };

  componentDidMount() {
    const offset = [
      { x: 190, y: 1, nome: "Rua1" },
      { x: 140, y: 30, nome: "Rua2" },
      { x: 100, y: 60, nome: "Rua3" },
      { x: 60, y: 100, nome: "Rua4" },
      { x: 14, y: 130, nome: "Rua5" },
      { x: 90, y: 310, nome: "Rua6" },
      { x: 130, y: 280, nome: "Rua7" },
      { x: 170, y: 245, nome: "Rua8" },
      { x: 220, y: 214, nome: "Rua9" },
      { x: 270, y: 170, nome: "Rua10" },
      { x: 220, y: 450, nome: "Rua11" },
      { x: 250, y: 425, nome: "Rua12" },
      { x: 290, y: 390, nome: "Rua13" },
      { x: 330, y: 350, nome: "Rua14" },
      { x: 380, y: 315, nome: "Rua15" },
      { x: 310, y: 580, nome: "Rua16" },
      { x: 350, y: 550, nome: "Rua17" },
      { x: 400, y: 510, nome: "Rua18" },
      { x: 440, y: 470, nome: "Rua19" },
      { x: 480, y: 435, nome: "Rua20" },
    ];

    this.setState({ offset });
  }

  render(): React.ReactNode {
    const { offset } = this.state;
    return (
      <div className="flex flex-col flex justity-center">
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
        <section className="container p-4 m-4 space-x-4 border-black border rounded-lg h-auto w-1/3">
          <div className="relative flex-col text-white">
            <img src={map} alt="Mapa" />
            <h3>{this.state.res && this.state.res.data}</h3>
            {offset.map((ponto, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-red-500 rounded-full absolute cursor-pointer"
                style={{ top: `${ponto.y}px`, left: `${ponto.x}px` }}
              >
                {ponto.nome}
              </div>
            ))}
            <svg className="absolute">
              {this.state.startPoint &&
                this.state.selectOptionMult &&
                this.state.selectOptionMult.length > 0 && (
                  <>
                    {this.state.selectOptionMult.map(
                      (selectedOption, index) => (
                        <circle
                          key={index}
                          cx={
                            offset.find((p) => p.nome === selectedOption.value)
                              ?.x
                          }
                          cy={
                            offset.find((p) => p.nome === selectedOption.value)
                              ?.y
                          }
                          r="5" // raio do círculo
                          fill="blue" // cor do círculo
                        />
                      ),
                    )}
                  </>
                )}
            </svg>
          </div>
        </section>
      </div>
    );
  }
}

export default Form;
