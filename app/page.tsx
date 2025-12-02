"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import FormularioSimulacion from "@/components/formulario-simulacion"
import GraficoSimulaciones from "@/components/grafico-simulaciones"
import ResumenResultados from "@/components/resumen-resultados"

export type Estadisticas = {
  precio_promedio: number;
  peor_caso: number;
  mejor_caso: number;
  percentil_5: number;
  percentil_25: number;
  percentil_50: number;
  percentil_75: number;
  percentil_95: number;
};

export type VarRiesgo = {
  valor: number;
  porcentaje: number;
};

export type ResultadoSimulacion = {
  simulaciones: {
    dia: number;
    simulaciones: number[];
    promedio: number;
    percentil_5: number;
    percentil_95: number;
  }[];
  estadisticas: Estadisticas;
  var: VarRiesgo;
};

export type ParametrosSimulacion = {
  precioActual: number;
  volatilidad: number;
  dias: number;
  numSimulaciones: number;
};


export default function Inicio() {
  const [resultados, setResultados] = useState<ResultadoSimulacion | null>(null)
  const [cargando, setCargando] = useState(false)
  const [parametros, setParametros] = useState<ParametrosSimulacion | null>(null)

  const manejarSimulacion = async (datos: ParametrosSimulacion) => {
    setParametros(datos)
    setCargando(true)

    try {
      const respuesta = await fetch("http://localhost:8000/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          precio_actual: datos.precioActual,
          volatilidad: datos.volatilidad,
          dias: datos.dias,
          num_simulaciones: datos.numSimulaciones,
        }),
      })

      const datos_resultados: ResultadoSimulacion = await respuesta.json()
      setResultados(datos_resultados)
    } catch (error) {
      console.error("Error en la simulacion:", error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="pt-2">
              <h1 className="text-3xl font-bold text-foreground">Análisis de Riesgo Financiero</h1>
            </div>

            <FormularioSimulacion onSimular={manejarSimulacion} cargando={cargando} />
          </div>

          <div className="lg:col-span-9 flex flex-col gap-6">
            {resultados && parametros ? (
              <>
                <GraficoSimulaciones
                  simulaciones={resultados.simulaciones}
                  parametros={parametros}
                />
                <ResumenResultados
                  estadisticas={resultados.estadisticas}
                  var={resultados.var}
                  precioActual={parametros.precioActual}
                />
              </>
            ) : (
              <Card className="h-96 flex items-center justify-center border-default">
                <CardContent className="text-center text-secondary">
                  Configura los parámetros y ejecuta una simulación para ver el análisis
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
