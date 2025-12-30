/**
 * Naive Bayes Classifier untuk prediksi Golf
 * 
 * Algoritma ini menggunakan teorema Bayes untuk menghitung probabilitas
 * apakah seseorang akan bermain golf berdasarkan kondisi cuaca.
 * 
 * Rumus: P(A|B) = P(B|A) * P(A) / P(B)
 * 
 * Dimana:
 * - P(A|B) = Probabilitas bermain golf given kondisi cuaca
 * - P(B|A) = Probabilitas kondisi cuaca given bermain golf
 * - P(A) = Probabilitas prior bermain golf
 * - P(B) = Probabilitas kondisi cuaca
 */

// Interface untuk data golf
interface GolfData {
  cuaca: string;
  temperatur: string;
  kelembaban: string;
  berangin: string;
  mainGolf: string;
}

// Interface untuk input prediksi
export interface PredictionInput {
  cuaca: string;
  temperatur: string;
  kelembaban: string;
  berangin: string;
}

// Interface untuk hasil prediksi
export interface PredictionResult {
  probabilitasYa: number;
  probabilitasNo: number;
  prediksi: string;
}

// Data training dari file CSV
const trainingData: GolfData[] = [
  { cuaca: "HUJAN", temperatur: "PANAS", kelembaban: "TINGGI", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "HUJAN", temperatur: "PANAS", kelembaban: "TINGGI", berangin: "YA", mainGolf: "TIDAK" },
  { cuaca: "MENDUNG", temperatur: "PANAS", kelembaban: "TINGGI", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "CERAH", temperatur: "HANGAT", kelembaban: "TINGGI", berangin: "TIDAK", mainGolf: "TIDAK" },
  { cuaca: "CERAH", temperatur: "DINGIN", kelembaban: "NORMAL", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "CERAH", temperatur: "DINGIN", kelembaban: "NORMAL", berangin: "YA", mainGolf: "TIDAK" },
  { cuaca: "MENDUNG", temperatur: "DINGIN", kelembaban: "NORMAL", berangin: "YA", mainGolf: "YA" },
  { cuaca: "HUJAN", temperatur: "HANGAT", kelembaban: "TINGGI", berangin: "TIDAK", mainGolf: "TIDAK" },
  { cuaca: "HUJAN", temperatur: "DINGIN", kelembaban: "NORMAL", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "CERAH", temperatur: "HANGAT", kelembaban: "NORMAL", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "HUJAN", temperatur: "HANGAT", kelembaban: "NORMAL", berangin: "YA", mainGolf: "YA" },
  { cuaca: "MENDUNG", temperatur: "HANGAT", kelembaban: "TINGGI", berangin: "YA", mainGolf: "YA" },
  { cuaca: "MENDUNG", temperatur: "PANAS", kelembaban: "NORMAL", berangin: "TIDAK", mainGolf: "YA" },
  { cuaca: "CERAH", temperatur: "DINGIN", kelembaban: "TINGGI", berangin: "YA", mainGolf: "TIDAK" },
];

/**
 * Menghitung probabilitas prior P(class)
 * Yaitu probabilitas bermain golf = YA atau TIDAK
 */
function calculatePrior(targetClass: string): number {
  const count = trainingData.filter(d => d.mainGolf === targetClass).length;
  return count / trainingData.length;
}

/**
 * Menghitung probabilitas likelihood P(feature|class) dengan Laplace smoothing
 * untuk menghindari probabilitas 0
 */
function calculateLikelihood(
  feature: keyof Omit<GolfData, 'mainGolf'>,
  value: string,
  targetClass: string
): number {
  // Filter data berdasarkan class
  const classData = trainingData.filter(d => d.mainGolf === targetClass);
  
  // Hitung berapa kali feature value muncul dalam class tersebut
  const count = classData.filter(d => d[feature] === value).length;
  
  // Hitung jumlah unique values untuk feature ini (untuk Laplace smoothing)
  const uniqueValues = new Set(trainingData.map(d => d[feature])).size;
  
  // Laplace smoothing: (count + 1) / (total + uniqueValues)
  return (count + 1) / (classData.length + uniqueValues);
}

/**
 * Fungsi utama untuk melakukan prediksi menggunakan Naive Bayes
 */
export function predict(input: PredictionInput): PredictionResult {
  // Hitung probabilitas untuk kelas YA
  const priorYa = calculatePrior("YA");
  const likelihoodYa = 
    calculateLikelihood("cuaca", input.cuaca, "YA") *
    calculateLikelihood("temperatur", input.temperatur, "YA") *
    calculateLikelihood("kelembaban", input.kelembaban, "YA") *
    calculateLikelihood("berangin", input.berangin, "YA");
  
  // Hitung probabilitas untuk kelas TIDAK
  const priorNo = calculatePrior("TIDAK");
  const likelihoodNo = 
    calculateLikelihood("cuaca", input.cuaca, "TIDAK") *
    calculateLikelihood("temperatur", input.temperatur, "TIDAK") *
    calculateLikelihood("kelembaban", input.kelembaban, "TIDAK") *
    calculateLikelihood("berangin", input.berangin, "TIDAK");
  
  // Hitung posterior probability (tidak perlu normalisasi dengan P(B) karena kita hanya butuh perbandingan)
  const posteriorYa = priorYa * likelihoodYa;
  const posteriorNo = priorNo * likelihoodNo;
  
  // Normalisasi untuk mendapatkan probabilitas dalam persen
  const total = posteriorYa + posteriorNo;
  const probabilitasYa = (posteriorYa / total) * 100;
  const probabilitasNo = (posteriorNo / total) * 100;
  
  return {
    probabilitasYa: Math.round(probabilitasYa * 100) / 100,
    probabilitasNo: Math.round(probabilitasNo * 100) / 100,
    prediksi: probabilitasYa > probabilitasNo ? "YA" : "TIDAK"
  };
}

/**
 * Mendapatkan statistik dari data training
 */
export function getTrainingStats() {
  const totalData = trainingData.length;
  const yaCount = trainingData.filter(d => d.mainGolf === "YA").length;
  const tidakCount = trainingData.filter(d => d.mainGolf === "TIDAK").length;
  
  return {
    totalData,
    yaCount,
    tidakCount,
    yaPersen: Math.round((yaCount / totalData) * 100),
    tidakPersen: Math.round((tidakCount / totalData) * 100)
  };
}
