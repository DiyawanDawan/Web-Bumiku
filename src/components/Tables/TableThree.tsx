import  { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { Document, Page, PDFViewer, StyleSheet, Text, View, pdf } from '@react-pdf/renderer';
import { IoCloseCircle } from "react-icons/io5";
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import LoadingSpiner from '../Spiner/Loading.js';
interface SensorData {
  id: string;
  sensorType: string;
  value: number;
  unit: string;
  createdAt: string;
}
const TableThree = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        setSensors(response)
        setLoading(false);
        console.log("response", response)
      } catch (error) {
        setLoading(false);
        // console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  // Sample data for the table
  // const sensors = [
  //   { id: 1, sensorType: 'PH', cunit: "PH", createdAt: '2024-05-15 15:04:41', value: 3 },
  //   { id: 3, sensorType: 'NH3', unit: "ppm", createdAt: '2024-05-15 15:04:41', value: 2.6 },
  //   { id: 26, sensorType: 'NH3', unit: "ppm", createdAt: '2024-05-15 15:6:41', value: 2 },
  //   { id: 28, sensorType: 'NH3', unit: "ppm", createdAt: '2024-05-15 15:9:41', value: 2.6 },
  //   { id: 27, sensorType: 'NH3', unit: "ppm", createdAt: '2024-05-15 15:9:41', value: 2 },
  // ];

  // Create styles for the PDF document
  const styles = StyleSheet.create({
    body: {
      size: "A4",
      paddingTop: 60,
      paddingBottom: 70,
      paddingHorizontal: 35,
      paddingLeft: 80,
      paddingRight: 70,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      marginBottom: 10,
      borderBottom: 1.5,
      paddingBottom: 11,
      textAlign: "center",
    },
    table: {
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tabelHead: {
      margin: 12,
      fontSize: 12,
      textAlign: 'center',
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontFamily: 'Times-Roman',

    },
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,

    },
    text: {
      justifyContent: "center",
      margin: 4,
      fontSize: 12,
      textAlign: 'center',
      alignItems: "center",
      fontFamily: 'Times-Roman'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: '#151515',
    },
  });

  const [pdfUrl, setPdfUrl] = useState("");
  const [selectedSensorType, setSelectedSensorType] = useState<string | null>(null); // State to store selected sensor type

  const handleDownloadAll = async () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.header}>Sensor Table (All Data)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>No</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Value</Text>
                </View>
              </View>
              {sensors.map((sensor, index) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text} >{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text} >{sensor.createdAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text} >{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
      </Document>
    );

    const blob = await pdf(MyDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_data_sensors.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Parametr latestPHSensor: { id: number; sensorType: string; cunit: string; createdAt: string; value: number; unit?: undefined; } | { id: number; sensorType: string; unit: string; createdAt: string; value: number; cunit?: undefined; }
  const handleDownloadPH = async () => {
    const filteredSensors = sensors.filter(sensor => sensor.sensorType === 'PH');

    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.header}>Sensor Table (PH)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>No</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Value</Text>
                </View>
              </View>
              {filteredSensors.map((sensor, index) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{sensor.createdAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
      </Document>
    );

    const blob = await pdf(MyDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_PH.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  // latestNH3Sensor: { id: number; sensorType: string; cunit: string; createdAt: string; value: number; unit?: undefined; } | { id: number; sensorType: string; unit: string; createdAt: string; value: number; cunit?: undefined; }
  const handleDownloadNH3 = async () => {
    const filteredSensors = sensors.filter(sensor => sensor.sensorType === 'NH3');

    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.header}>Sensor Table (NH3)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>

                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>No</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tabelHead}>Value</Text>
                </View>
              </View>
              {filteredSensors.map((sensor, index) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text} >{sensor.createdAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.text}>{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
             <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
      </Document>
    );

    const blob = await pdf(MyDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_NH3.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter data PH dan NH3
  const phSensor = sensors.filter(sensor => sensor.sensorType === 'PH');
  const nh3Sensor = sensors.filter(sensor => sensor.sensorType === 'NH3');

  // Ambil data terbaru untuk PH dan NH3
  const latestPHSensor = phSensor.length > 0 ? phSensor.reduce((prev, current) => new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev) : null;
  const latestNH3Sensor = nh3Sensor.length > 0 ? nh3Sensor.reduce((prev, current) => new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev) : null;

  // Gabungkan data untuk mendownload semua jenis data
  const combinedSensorData = {
    id: "all",
    sensorType: "All",
    createdAt: "N/A",
    value: "N/A",
  };


  const handleViewPdf = (sensorType: string) => {
    setSelectedSensorType(sensorType);
    setPdfUrl(sensorType);
  };

  const sensorsToDisplay = [latestPHSensor, latestNH3Sensor, combinedSensorData].filter(sensor => sensor !== null);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Download File
        </h4>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-slate-500 dark:border-stroke border-b-2">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sensor Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Update
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Value
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
         
          <tbody>
             {loading ? (
            <tr>
            <td colSpan={5} className="text-center py-4">
              <LoadingSpiner />
            </td>
          </tr>
          ) : (
           <>
            {sensorsToDisplay.map((sensor, index) => (
              sensor && (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {sensor.sensorType}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {sensor.createdAt}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {sensor.value}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* Button View */}
                      <button
                        className="hover:text-primary"
                        onClick={() => handleViewPdf(sensor.sensorType)}
                      >
                        <FaEye size={30} />
                      </button>

                      {/* Button Download All */}
                      {sensor.sensorType === 'All' && (
                        <button
                          className="hover:text-primary"
                          onClick={handleDownloadAll}
                        >
                          <HiOutlineDownload size={30} />
                        </button>
                      )}

                      {/* Button Download PH */}
                      {sensor.sensorType === 'PH' && (
                        <button
                          className="hover:text-primary"
                          onClick={handleDownloadPH}
                        >
                          <HiOutlineDownload size={30} />
                        </button>
                      )}

                      {/* Button Download NH3 */}
                      {sensor.sensorType === 'NH3' && (
                        <button
                          className="hover:text-primary"
                          onClick={handleDownloadNH3}
                        >
                          <HiOutlineDownload size={30} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            ))}
           </>
          )}
           
          </tbody>
        </table>
      </div>
      {pdfUrl && (
        <div className="fixed top-20 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative" style={{ width: '70%', height: '100%' }}>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <Document>
                {/* Render PDF based on selected sensor type */}
                <Page size="A4" style={styles.body}>
                  <View style={styles.section}>
                    {/* Header */}
                    <Text style={styles.header}>Sensor Table ({selectedSensorType})</Text>
                    {/* Table */}
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tabelHead}>No</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tabelHead}>Sensor Type</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tabelHead}>CreateAt</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tabelHead}>Value</Text>
                        </View>
                      </View>
                      {/* Render table content based on selected sensor type */}
                      {selectedSensorType === 'All'
                        ? sensors.map((sensor, index) => (
                          <View key={sensor.id} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                              <Text style={styles.text}>{index + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.text}>{sensor.sensorType}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.text}>{sensor.createdAt}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.text}>{sensor.value}</Text>
                            </View>
                          </View>
                        ))
                        : sensors
                          .filter(sensor => sensor.sensorType === selectedSensorType)
                          .map((sensor, index) => (
                            <View key={sensor.id} style={styles.tableRow}>
                              <View style={styles.tableCol}>
                                <Text style={styles.text}>{index + 1}</Text>
                              </View>
                              <View style={styles.tableCol}>
                                <Text style={styles.text}>{sensor.sensorType}</Text>
                              </View>
                              <View style={styles.tableCol}>
                                <Text style={styles.text}>{sensor.createdAt}</Text>
                              </View>
                              <View style={styles.tableCol}>
                                <Text style={styles.text}>{sensor.value}</Text>
                              </View>
                            </View>
                          ))
                      }
                    </View>
                  </View>
                  <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
              </Document>
            </PDFViewer>
            {/* Close button */}
            <div>
              <button className="absolute rounded-lg top-9 -right-6  hover:bg-slate-500 active:bg-slate-600 transform -translate-y-1/2  text-white bg-slate-600 " onClick={() => setPdfUrl("")}>
                <IoCloseCircle size={30} title="Close PDF" className="text-red-600 -6" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TableThree;

