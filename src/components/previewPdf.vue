<template>
  <div>
    <!-- Your existing code -->

    <!-- Generate Resume and Preview Button -->
    <div class="generate-resume">
      <v-btn color="primary" @click="previewResume">Preview Resume</v-btn>
      <v-btn color="secondary" @click="downloadResume">Download Resume</v-btn>
    </div>

    <!-- PDF Preview Modal -->
    <v-dialog v-model="pdfPreviewVisible" max-width="800px">
      <v-card>
        <v-card-title>PDF Preview</v-card-title>
        <v-card-text>
          <iframe
            v-if="pdfDataUrl"
            :src="pdfDataUrl"
            width="100%"
            height="600px"
          ></iframe>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="pdfPreviewVisible = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import jsPDF from 'jspdf'

export default {
  data() {
    return {
      pdfPreviewVisible: false,
      pdfDataUrl: null,
    }
  },
  methods: {
    generatePdf() {
      const doc = new jsPDF()
      // Your existing code for generating the PDF
      return doc
    },
    previewResume() {
      const doc = this.generatePdf()
      this.pdfDataUrl = doc.output('dataurlstring')
      this.pdfPreviewVisible = true
    },
    downloadResume() {
      const doc = this.generatePdf()
      doc.save('resume.pdf')
    },
  },
}
</script>
