import React, { useEffect, useState } from 'react';
import { FaEye, FaFilePdf } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { Document, Page, PDFViewer, StyleSheet, Text, View, pdf } from '@react-pdf/renderer';
import { IoCloseCircle } from "react-icons/io5";
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

const TableThree = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        console.log("response", response)
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  // Sample data for the table
  const sensors = [
    { id: 1, sensorType: 'PH', cunit: "PH", createAt: '2024-05-15 15:04:41', value: 3 },
    { id: 3, sensorType: 'NH3', unit: "ppm", createAt: '2024-05-15 15:04:41', value: 2.6 },
    { id: 26, sensorType: 'NH3', unit: "ppm", createAt: '2024-05-15 15:6:41', value: 2 },
    { id: 28, sensorType: 'NH3', unit: "ppm", createAt: '2024-05-15 15:9:41', value: 2.6 },
    { id: 27, sensorType: 'NH3', unit: "ppm", createAt: '2024-05-15 15:9:41', value: 2 },
  ];

  // Create styles for the PDF document
  const styles = StyleSheet.create({
    body: {
      size: "A4",
      paddingTop: 70,
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
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
  });

  const [pdfUrl, setPdfUrl] = useState("");

  const handleDownloadAll = async () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.header}>Sensor Table (All Data)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>ID</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Value</Text>
                </View>
              </View>
              {sensors.map((sensor) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text>{sensor.id}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.createAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
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

  // Parametr latestPHSensor: { id: number; sensorType: string; cunit: string; createAt: string; value: number; unit?: undefined; } | { id: number; sensorType: string; unit: string; createAt: string; value: number; cunit?: undefined; }
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
                  <Text>ID</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Value</Text>
                </View>
              </View>
              {filteredSensors.map((sensor) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text>{sensor.id}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.createAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
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
// latestNH3Sensor: { id: number; sensorType: string; cunit: string; createAt: string; value: number; unit?: undefined; } | { id: number; sensorType: string; unit: string; createAt: string; value: number; cunit?: undefined; }
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
                  <Text>ID</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Sensor Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>CreateAt</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>Value</Text>
                </View>
              </View>
              {filteredSensors.map((sensor) => (
                <View key={sensor.id} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text>{sensor.id}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.sensorType}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.createAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{sensor.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
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

  const handleViewPdf = (url: string) => {
    setPdfUrl(url);
  };
// Filter data PH dan NH3
const phSensor = sensors.filter(sensor => sensor.sensorType === 'PH');
const nh3Sensor = sensors.filter(sensor => sensor.sensorType === 'NH3');

// Ambil data terbaru untuk PH dan NH3
const latestPHSensor = phSensor.length > 0 ? phSensor.reduce((prev, current) => new Date(current.createAt) > new Date(prev.createAt) ? current : prev) : null;
const latestNH3Sensor = nh3Sensor.length > 0 ? nh3Sensor.reduce((prev, current) => new Date(current.createAt) > new Date(prev.createAt) ? current : prev) : null;

// Gabungkan data untuk mendownload semua jenis data
const combinedSensorData = {
  id: "all",
  sensorType: "All",
  createAt: "N/A",
  value: "N/A",
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
              {sensor.createAt}
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
                  <FaFilePdf size={30} />
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
  </tbody>
        </table>
      </div>
      {pdfUrl && (
        <div className="fixed top-20 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative" style={{ width: '70%', height: '100%' }}>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <Document>
                <Page style={styles.body}>
                  <View>
                    <Text>PDF Viewer</Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
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

