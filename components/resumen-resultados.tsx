"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Estadisticas = {
  precio_promedio: number;
  peor_caso: number;
  mejor_caso: number;
  percentil_5: number;
  percentil_25: number;
  percentil_50: number;
  percentil_75: number;
  percentil_95: number;
};

type VarRiesgo = {
  valor: number;
  porcentaje: number;
};

type Props = {
  estadisticas: Estadisticas;
  var: VarRiesgo;
  precioActual: number;
};


export default function ResumenResultados({ estadisticas, var: varRiesgo, precioActual }: Props) {
  const cambio_promedio = ((estadisticas.precio_promedio - precioActual) / precioActual) * 100
  const cambio_mejor = ((estadisticas.mejor_caso - precioActual) / precioActual) * 100
  const cambio_peor = ((estadisticas.peor_caso - precioActual) / precioActual) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-default bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-black">Precio Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-black">${estadisticas.precio_promedio.toFixed(2)}</div>
              <div
                className={`text-sm font-semibold ${cambio_promedio >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}
              >
                {cambio_promedio >= 0 ? "+" : ""}
                {cambio_promedio.toFixed(2)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-default bg-gradient-to-br from-[var(--color-success)]/5 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-black">Mejor Caso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-black">${estadisticas.mejor_caso.toFixed(2)}</div>
              <div className="text-sm font-semibold text-[var(--color-success)]">+{cambio_mejor.toFixed(2)}%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-default bg-gradient-to-br from-[var(--color-danger)]/5 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-black">Peor Caso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-black">${estadisticas.peor_caso.toFixed(2)}</div>
              <div className="text-sm font-semibold text-[var(--color-danger)]">{cambio_peor.toFixed(2)}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-[var(--color-danger)] border-default bg-gradient-to-br from-[var(--color-danger)]/5 to-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground">Valor en Riesgo (95%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-black">Pérdida Máxima Esperada</p>
              <p className="text-3xl font-bold text-[var(--color-danger)]">${varRiesgo.valor.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Porcentaje de Riesgo</p>
              <p className="text-3xl font-bold text-[var(--color-danger)]">{varRiesgo.porcentaje.toFixed(2)}%</p>
            </div>
          </div>
          <p className="text-sm font-medium text-black"></p>
        </CardContent>
      </Card>

      <Card className="border-default">
        <CardHeader>
          <CardTitle className="text-foreground">Distribución de Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Porcentaje 5", value: estadisticas.percentil_5, key: "p5" },
              { label: "Porcentaje 25", value: estadisticas.percentil_25, key: "p25" },
              { label: "Porcentaje 50", value: estadisticas.percentil_50, key: "p50" },
              { label: "Porcentaje 75", value: estadisticas.percentil_75, key: "p75" },
              { label: "Porcentaje 95", value: estadisticas.percentil_95, key: "p95" },
            ].map((item) => (
              <div key={item.key} className="text-center">
                <p className="text-sm font-medium text-black">{item.label}</p>
                <p className="text-lg font-bold text-foreground">${item.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
