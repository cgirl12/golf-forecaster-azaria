import { useState } from "react";
import { predict, PredictionResult, getTrainingStats } from "@/utils/naiveBayes";

/**
 * Komponen Form Prediksi
 * Menampilkan form input untuk kondisi cuaca dan hasil prediksi
 */
const PredictionForm = () => {
  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    cuaca: "",
    temperatur: "",
    kelembaban: "",
    berangin: ""
  });

  // State untuk menyimpan hasil prediksi
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  // State untuk animasi
  const [isCalculating, setIsCalculating] = useState(false);

  // Handler untuk perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset result saat input berubah
    setResult(null);
  };

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi semua field harus terisi
    if (!formData.cuaca || !formData.temperatur || !formData.kelembaban || !formData.berangin) {
      return;
    }

    // Animasi loading
    setIsCalculating(true);
    
    // Simulasi delay untuk efek visual
    setTimeout(() => {
      // Lakukan prediksi dengan Naive Bayes
      const prediction = predict({
        cuaca: formData.cuaca,
        temperatur: formData.temperatur,
        kelembaban: formData.kelembaban,
        berangin: formData.berangin
      });
      
      setResult(prediction);
      setIsCalculating(false);
    }, 800);
  };

  // Cek apakah form valid
  const isFormValid = formData.cuaca && formData.temperatur && formData.kelembaban && formData.berangin;

  // Get training stats untuk info
  const stats = getTrainingStats();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Info Card */}
      <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/20">
            <svg className="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-foreground font-medium">Informasi Data Training</p>
            <p className="text-xs text-muted-foreground mt-1">
              Model dilatih dengan {stats.totalData} data ({stats.yaCount} bermain golf, {stats.tidakCount} tidak bermain)
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Input Kondisi Cuaca
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cuaca */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Cuaca
            </label>
            <select
              name="cuaca"
              value={formData.cuaca}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Pilih kondisi cuaca...</option>
              <option value="CERAH">☀️ Cerah</option>
              <option value="MENDUNG">☁️ Mendung</option>
              <option value="HUJAN">🌧️ Hujan</option>
            </select>
            </div>

            {/* Temperatur */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
              </svg>
              Temperatur
            </label>
            <select
              name="temperatur"
              value={formData.temperatur}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Pilih temperatur...</option>
              <option value="PANAS">🔥 Panas</option>
              <option value="HANGAT">🌡️ Hangat</option>
              <option value="DINGIN">❄️ Dingin</option>
            </select>
            </div>

            {/* Kelembaban */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
              Kelembaban
            </label>
            <select
              name="kelembaban"
              value={formData.kelembaban}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Pilih tingkat kelembaban...</option>
              <option value="TINGGI">💧 Tinggi</option>
              <option value="NORMAL">💨 Normal</option>
            </select>
            </div>

            {/* Berangin */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
              </svg>
              Berangin
            </label>
            <select
              name="berangin"
              value={formData.berangin}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Pilih kondisi angin...</option>
              <option value="YA">🌬️ Ya (Berangin)</option>
              <option value="TIDAK">🍃 Tidak (Tidak Berangin)</option>
            </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isCalculating}
            className={`w-full btn-primary mt-6 flex items-center justify-center gap-2 ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCalculating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Menghitung Probabilitas...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Prediksi Sekarang
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Section */}
      {result && (
        <div className="mt-8 animate-slide-up">
          <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">
            Hasil Prediksi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Probabilitas YA */}
            <div className={`result-card yes`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <svg className="h-6 w-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Bermain Golf</span>
              </div>
              <div className="text-4xl font-heading font-bold text-success">
                {result.probabilitasYa.toFixed(2)}%
              </div>
              <div className="mt-2 h-2 bg-success/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-1000"
                  style={{ width: `${result.probabilitasYa}%` }}
                />
              </div>
            </div>

            {/* Probabilitas TIDAK */}
            <div className={`result-card no`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <svg className="h-6 w-6 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Tidak Bermain</span>
              </div>
              <div className="text-4xl font-heading font-bold text-destructive">
                {result.probabilitasNo.toFixed(2)}%
              </div>
              <div className="mt-2 h-2 bg-destructive/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive rounded-full transition-all duration-1000"
                  style={{ width: `${result.probabilitasNo}%` }}
                />
              </div>
            </div>
          </div>

          {/* Final Prediction */}
          <div className={`mt-6 p-6 rounded-xl text-center ${
            result.prediksi === "YA" 
              ? "bg-success/10 border-2 border-success/30" 
              : "bg-destructive/10 border-2 border-destructive/30"
          }`}>
            <p className="text-muted-foreground mb-2">Keputusan Akhir</p>
            <p className={`text-2xl font-heading font-bold ${
              result.prediksi === "YA" ? "text-success" : "text-destructive"
            }`}>
              {result.prediksi === "YA" 
                ? "✅ COCOK untuk bermain golf!" 
                : "❌ TIDAK disarankan bermain golf"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
