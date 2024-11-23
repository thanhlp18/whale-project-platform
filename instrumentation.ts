import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston";
import { registerOTel } from "@vercel/otel";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-web";

export async function register() {
  console.log("Registering OpenTelemetry", process.env.NEXT_RUNTIME);
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ZipkinExporter } = await import("@opentelemetry/exporter-zipkin");

    const exporter = new ZipkinExporter({
      url: process.env.ZIPKIN_COLLECTOR_ENDPOINT,
    });

    registerOTel({
      attributes: {
        buildId: process.env.BUILD_ID || "local",
      },
      serviceName: "next-app",
      spanProcessors: [new BatchSpanProcessor(exporter)],
      instrumentations: [
        new HttpInstrumentation(),
        new WinstonInstrumentation({
          enabled: true,
          logHook: (span, record) => {
            console.log("Winston logHook", span, record);
            record['traceId'] = span.spanContext().traceId;
            record['spanId'] = span.spanContext().spanId;
            record['traceFlags'] = span.spanContext().traceFlags;
            delete record['trace_id'];
            delete record['span_id'];
            delete record['trace_flags'];
          }
        })
      ],
    });
  }
}